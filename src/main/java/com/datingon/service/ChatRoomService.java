package com.datingon.service;

import com.datingon.entity.chat.ChatRoom;
import com.datingon.entity.user.User;
import com.datingon.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRoomService extends GeneralService<ChatRoom> {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    public List<ChatRoom> getAllByUser(User user) {
        return chatRoomRepository.findAllByUserListContains(user);
    }

    public ChatRoom getChatById(Long id) {
        return chatRoomRepository.findEntityById(id);
    }
}
