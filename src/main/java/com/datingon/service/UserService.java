package com.datingon.service;

import com.datingon.entity.user.User;
import com.datingon.exception.DataNotFoundException;
import com.datingon.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService extends GeneralService<User> {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> new DataNotFoundException("User doesn't exist"));
    }

    public List<User> findAllSuggestionsByEmail(String email) {
        Optional<User> userByEmail = userRepository.findUserByEmail(email);
        User user = userByEmail.orElseThrow(() -> new DataNotFoundException("User doesn't exist"));
        return userRepository.findAllSuggestionsByUserId(user.getId());
    }

    public List<User> findAllMatchesByEmail(String email) {
        Optional<User> userByEmail = userRepository.findUserByEmail(email);
        User user = userByEmail.orElseThrow(() -> new DataNotFoundException("User doesn't exist"));
        return userRepository.findAllMatchesByUserId(user.getId());
    }

//    public List<User> findAllMatchesByEmail(String email) {
//        Optional<User> userByEmail = userRepository.findUserByEmail(email);
//        User user = userByEmail.orElseThrow(() -> new DataNotFoundException("User doesn't exist"));
//        return userRepository.findAllMatchesByUserId(user.getId());
//    }
}
