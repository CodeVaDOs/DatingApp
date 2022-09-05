package com.datingon.dto.rs;

import lombok.Data;

import java.util.Date;

@Data
public class MessageResponse {
    String body;
    Long senderId;
    Date createdDate;
}
