package com.datingon.repository;

import com.datingon.entity.chat.ChatRoom;
import com.datingon.entity.user.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends RepositoryInterface<ChatRoom> {
    List<ChatRoom> findAllByUserListContains(User user);
}
