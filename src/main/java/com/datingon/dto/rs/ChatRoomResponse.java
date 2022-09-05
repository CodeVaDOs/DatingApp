package com.datingon.dto.rs;

import lombok.Data;

import java.util.List;

@Data
public class ChatRoomResponse {
    Long id;
    List<MessageResponse> messageList;
    List<UserResponse> userList;
}
