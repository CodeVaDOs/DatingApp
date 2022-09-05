package com.datingon.facade;

import com.datingon.dto.rq.UpdateAvatarRequest;
import com.datingon.dto.rq.UpdateProfileRequest;
import com.datingon.dto.rq.UserRequest;
import com.datingon.dto.rs.UserResponse;
import com.datingon.entity.user.User;
import com.datingon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserFacade extends GeneralFacade<User, UserRequest, UserResponse> {
    @Autowired
    private UserService service;

    @PostConstruct
    public void init() {

    }

    public UserResponse getProfile(String email) {
        return convertToDto(
                service.getUserByEmail(email)
        );
    }

    public List<UserResponse> findAllSuggestionsByEmail(String email) {
        return service.findAllSuggestionsByEmail(email).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserResponse> findAllMatchesByEmail(String email) {
        return service.findAllMatchesByEmail(email).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserResponse updateProfile(UpdateProfileRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = service.getUserByEmail(authentication.getName());
        user.setFullName(request.getFullName());
        user.setAbout(request.getAbout());
        return convertToDto(service.save(user));
    }

    public UserResponse updateAvatar(UpdateAvatarRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = service.getUserByEmail(authentication.getName());
        user.setAvatarUrl(request.getAvatarUrl());
        return convertToDto(service.save(user));
    }
//    public List<UserResponse> findAllMatchesByEmail(String email) {
//        return service.findAllMatchesByEmail(email).stream()
//                .map(this::convertToDto)
//                .collect(Collectors.toList());
//    }
}
