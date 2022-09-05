package com.datingon.dto.rs;

import com.datingon.entity.user.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private Role role;
    private String phoneNumber;
    private String fullName;
    private LocalDate birthday;
    private String country;
    private String interests;
    private String about;
    private String avatarUrl;
}
