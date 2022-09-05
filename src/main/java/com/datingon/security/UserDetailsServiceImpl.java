package com.datingon.security;

import com.datingon.entity.user.User;
import com.datingon.exception.DataNotFoundException;
import com.datingon.exception.JwtAuthenticationException;
import com.datingon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() ->
            new JwtAuthenticationException(String.format("User with email %s doesn't exists", email))
        );
        return SecurityUser.fromUser(user);
    }
}