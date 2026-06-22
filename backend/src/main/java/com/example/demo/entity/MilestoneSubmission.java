package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "milestone_submission")

public class MilestoneSubmission {
    private Long id;
    private Long student_id;
    private Long roadmap_id;
    private String status;
    private Integer progressPercentage;
    private LocalDateTime
}
