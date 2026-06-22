package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "milestone_submission")

public class MilestoneSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long enrollment_id;
    private Long milestone_id;
    private String contentUrl;
    private String status;
    private Integer score;
    private LocalDateTime submittedAt;

}
