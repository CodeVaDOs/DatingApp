package com.datingon.dto.rs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ViolationResponse {
    private String fieldName;
    private String message;
}
