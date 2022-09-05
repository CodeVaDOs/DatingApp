package com.datingon.facade;

import com.datingon.dto.rq.MessageRequest;
import com.datingon.dto.rq.UserRequest;
import com.datingon.dto.rs.MessageResponse;
import com.datingon.dto.rs.UserResponse;
import com.datingon.entity.chat.ChatRoom;
import com.datingon.entity.chat.Message;
import com.datingon.entity.user.User;
import com.datingon.service.ChatRoomService;
import com.datingon.service.MessageService;
import com.datingon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class MessageFacade extends GeneralFacade<Message, MessageRequest, MessageResponse> {
    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private ChatRoomService chatRoomService;

    @PostConstruct
    public void init() {

    }

    public MessageResponse createMessage(MessageRequest request, Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getUserByEmail(authentication.getName());

        ChatRoom chatById = chatRoomService.getChatById(id);

        Message message = new Message(chatById, user, request.getBody());
        chatById.getMessageList().add(message);
        return convertToDto(messageService.save(message));
    }
}
