package com.datingon.dto.rq;

import com.datingon.entity.grade.GradeType;
import lombok.Data;

@Data
public class GradeRequest {
    Long userReceived;
    GradeType gradeType;
}
