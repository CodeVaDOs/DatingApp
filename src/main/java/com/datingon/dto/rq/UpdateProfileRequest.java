package com.datingon.dto.rq;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String fullName;
    private String about;
}
