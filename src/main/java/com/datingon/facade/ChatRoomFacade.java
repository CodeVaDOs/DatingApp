package com.datingon.facade;

import com.datingon.dto.rq.ChatRoomRequest;
import com.datingon.dto.rq.GradeRequest;
import com.datingon.dto.rq.MessageRequest;
import com.datingon.dto.rs.ChatRoomResponse;
import com.datingon.dto.rs.GradeResponse;
import com.datingon.entity.chat.ChatRoom;
import com.datingon.entity.chat.Message;
import com.datingon.entity.grade.Grade;
import com.datingon.entity.user.User;
import com.datingon.exception.DataNotFoundException;
import com.datingon.service.ChatRoomService;
import com.datingon.service.GradeService;
import com.datingon.service.MessageService;
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
public class ChatRoomFacade extends GeneralFacade<ChatRoom, ChatRoomRequest, ChatRoomResponse> {
    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @PostConstruct
    public void init() {
        super.getMm().typeMap(ChatRoomRequest.class, ChatRoom.class);
    }

    public ChatRoomResponse createChatRoom(ChatRoomRequest chatRoomRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findEntityById(chatRoomRequest.getUserId());
        User currentUser = userService.getUserByEmail(authentication.getName());
        List<User> users = List.of(user, currentUser);
        ChatRoom chatRoom = new ChatRoom(List.of(), users);
        user.getChatRoomList().add(chatRoom);
        currentUser.getChatRoomList().add(chatRoom);
        return convertToDto(
                chatRoomService.createChatRoom(chatRoom)
        );
    }

    public List<ChatRoomResponse> getAllByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getUserByEmail(authentication.getName());
        return chatRoomService.getAllByUser(user).stream()
                .map(cr -> {
                    cr.setUserList(
                            cr.getUserList().stream().filter(u -> !u.equals(user))
                                    .collect(Collectors.toList())
                    );
                    return convertToDto(cr);
                })
                .collect(Collectors.toList());
    }


    public ChatRoomResponse getChatById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getUserByEmail(authentication.getName());

        ChatRoom chatById = chatRoomService.getChatById(id);

        boolean contains = chatById.getUserList().contains(user);
        if (!contains) throw new DataNotFoundException("User in chat not found");

        chatById.setUserList(
                chatById.getUserList().stream().filter(u -> !u.equals(user))
                        .collect(Collectors.toList())
        );
        return convertToDto(chatById);
    }


}
