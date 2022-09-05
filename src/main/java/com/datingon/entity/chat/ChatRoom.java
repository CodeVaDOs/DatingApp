package com.datingon.entity.chat;

import com.datingon.entity.BaseEntity;
import com.datingon.entity.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "chat_rooms")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom extends BaseEntity {
    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Message> messageList;

    @ManyToMany(mappedBy = "chatRoomList")
    private List<User> userList;
}
