package com.datingon.entity.grade;

import com.datingon.entity.BaseEntity;
import com.datingon.entity.user.User;
import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "grades")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Grade extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private GradeType gradeType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_given_id", referencedColumnName = "id")
    private User userGiven;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_received_id", referencedColumnName = "id")
    private User userReceived;
}
