package com.datingon.dto.rs;

import com.datingon.entity.grade.GradeType;
import com.datingon.entity.user.User;
import lombok.Data;

@Data
public class GradeResponse {
    private GradeType gradeType;
    private Long userReceived;
}
