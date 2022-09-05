package com.datingon.service;

import com.datingon.entity.RefreshToken;
import com.datingon.entity.user.User;
import com.datingon.exception.AlreadyExistException;
import com.datingon.exception.DataNotFoundException;
import com.datingon.exception.JwtAuthenticationException;
import com.datingon.repository.RefreshTokenRepository;
import com.datingon.repository.UserRepository;
import com.datingon.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.expirationRefresh}")
    private long validityRefreshToken;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RefreshToken readRefreshToken(Long id) {
        return refreshTokenRepository.findById(id).orElseThrow(() -> new JwtAuthenticationException("refreshToken not found", HttpStatus.FORBIDDEN));
    }

    public RefreshToken createRefreshToken(User user) {
        return refreshTokenRepository.save(new RefreshToken(validityRefreshToken, user));
    }

    public void markUsed(Long id) {
        refreshTokenRepository.findById(id)
                .map(t -> {
                    t.setIsUsed(true);
                    return refreshTokenRepository.save(t);
                })
                .orElseThrow(() -> new DataNotFoundException("refreshToken with id " + id + "not found"));
    }

    public Map<Object, Object> createTokens(User u) {
        String token = jwtTokenProvider.createToken(u.getEmail(), u.getRole().name(), u.getId());

        RefreshToken createdRefreshToken = this.createRefreshToken(u);
        String refreshToken = jwtTokenProvider.createRefreshToken(createdRefreshToken.getId());

        Map<Object, Object> tokens = new HashMap<>();
        tokens.put("userId", u.getId());
        tokens.put("token", token);
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }

    public Map<Object, Object> authenticate(String email, String password) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new DataNotFoundException("User doesn't exists"));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        return createTokens(user);
    }

    public Map<Object, Object> register(String email, String password) {
        if (userRepository.findUserByEmail(email).isPresent()) {
            throw new AlreadyExistException("User with email " + email + "already exist");
        }

        userRepository.save(new User(passwordEncoder.encode(password), email));
        return authenticate(email, password);
    }

    public Map<Object, Object> refresh(String refreshToken) {
        Long refreshTokenId = jwtTokenProvider.getRefreshTokenId(refreshToken);
        RefreshToken rt = readRefreshToken(refreshTokenId);

        if (rt.getExpirationDate().before(new Date()) || rt.getIsUsed()) {
            throw new JwtAuthenticationException("refreshToken is expired", HttpStatus.UNAUTHORIZED);
        } else {
            markUsed(refreshTokenId);
            User user = userRepository.findById(rt.getUser().getId()).orElseThrow(() -> new DataNotFoundException("User doesn't exists"));
            return createTokens(user);
        }
    }
}
