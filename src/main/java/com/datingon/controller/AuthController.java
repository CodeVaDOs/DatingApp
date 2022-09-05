package com.datingon.controller;


import com.datingon.dto.groups.OnCreate;
import com.datingon.dto.rq.AuthRequest;
import com.datingon.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("api/v1/auth")
@Validated
@RestController
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody @Valid AuthRequest request) {
        try {
            return ResponseEntity.ok(authService.authenticate(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @Validated(OnCreate.class)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Error with registration: " + e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestHeader("Refresh-token") String token) {
        try {
            return ResponseEntity.ok(authService.refresh(token));
        } catch (RuntimeException e) {
            return new ResponseEntity<>("JWT token is expired or invalid", HttpStatus.FORBIDDEN);
        }
    }

//    @PostMapping("/forgotPassword")
//    public ResponseEntity<?> forgotPassword(@RequestBody @Valid RequestResetPassword request) {
//        try {
//            resetPasswordService.sendMessageToEmail(request.getEmail());
//            return new ResponseEntity<>(HttpStatus.OK);
//        } catch (MessagingException e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @GetMapping("/resetPassword/{token}")
//    public void resetPassword(HttpServletResponse response, @PathVariable("token") @NotBlank String token) throws IOException {
//        response.sendRedirect(String.format("%s/%s/%s", clientUrl, clientChangePasswordPath, resetPasswordService.resetPassword(token)));
//    }
//
//    @PostMapping("/updatePassword")
//    public ResponseEntity<?> updatePassword(@RequestBody @Valid PasswordRequest request, @RequestHeader("Token") String token) {
//        try {
//            return ResponseEntity.ok(resetPasswordService.updatePassword(token, request.getPassword()));
//        } catch (RuntimeException e) {
//            return new ResponseEntity<>("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
//        }
//    }
}
