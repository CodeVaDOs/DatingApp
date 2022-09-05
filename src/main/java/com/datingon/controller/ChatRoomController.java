package com.datingon.controller;

import com.datingon.dto.rq.ChatRoomRequest;
import com.datingon.dto.rq.MessageRequest;
import com.datingon.dto.rs.ChatRoomResponse;
import com.datingon.facade.ChatRoomFacade;
import com.datingon.facade.MessageFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("api/v1/chat")
@Validated
@RestController
public class ChatRoomController {
    private final ChatRoomFacade chatRoomFacade;
    private final MessageFacade messageFacade;

    public ChatRoomController(ChatRoomFacade chatRoomFacade, MessageFacade messageFacade) {
        this.chatRoomFacade = chatRoomFacade;
        this.messageFacade = messageFacade;
    }


    @PostMapping
    @PreAuthorize("hasAuthority('read')")
    public ResponseEntity<ChatRoomResponse> createChat(@RequestBody @Valid ChatRoomRequest request) {
        return ResponseEntity.ok(chatRoomFacade.createChatRoom(request));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('read')")
    public ResponseEntity<List<ChatRoomResponse>> getAllChatsByUser() {
        return ResponseEntity.ok(chatRoomFacade.getAllByUser());
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('read')")
    public ResponseEntity<ChatRoomResponse> getChatById(@PathVariable Long id) {
        return ResponseEntity.ok(chatRoomFacade.getChatById(id));
    }

    @PostMapping("{id}")
    @PreAuthorize("hasAuthority('read')")
    public ResponseEntity<?> createMessage(@RequestBody @Valid MessageRequest request, @PathVariable Long id) {
        return ResponseEntity.ok(messageFacade.createMessage(request, id));
    }
}
