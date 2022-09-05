package com.datingon.repository;

import com.datingon.entity.chat.Message;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends RepositoryInterface<Message> {
}
