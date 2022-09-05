package com.datingon.service;

import com.datingon.entity.grade.Grade;
import com.datingon.entity.grade.GradeType;
import com.datingon.entity.user.User;
import com.datingon.repository.GradeRepository;
import org.springframework.stereotype.Service;

@Service
public class GradeService extends GeneralService<Grade> {
    private final GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public Grade gradeUser(Grade grade) {
        return gradeRepository.save(grade);
    }
}
