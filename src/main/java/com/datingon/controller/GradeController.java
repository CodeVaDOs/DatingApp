package com.datingon.controller;

import com.datingon.dto.rq.AuthRequest;
import com.datingon.dto.rq.GradeRequest;
import com.datingon.dto.rs.GradeResponse;
import com.datingon.facade.GradeFacade;
import com.datingon.service.GradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RequestMapping("api/v1/grade")
@Validated
@RestController
public class GradeController {
    private final GradeService gradeService;
    private final GradeFacade gradeFacade;

    public GradeController(GradeService gradeService, GradeFacade gradeFacade) {
        this.gradeService = gradeService;
        this.gradeFacade = gradeFacade;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('read')")
    public ResponseEntity<GradeResponse> gradeUser(@RequestBody @Valid GradeRequest request, Principal principal) {
        return ResponseEntity.ok(gradeFacade.gradeUser(request, principal));
    }
}
