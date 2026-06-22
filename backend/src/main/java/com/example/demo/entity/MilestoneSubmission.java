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

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getEnrollment_id() {
        return enrollment_id;
    }
    public void setEnrollment_id(Long enrollment_id) {
        this.enrollment_id = enrollment_id;
    }
    public Long getMilestone_id() {
        return milestone_id;
    }
    public void setMilestone_id(Long milestone_id) {
        this.milestone_id = milestone_id;
    }
    public String getContentUrl() {
        return contentUrl;
    }
    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Integer getScore() {
        return score;
    }
    public void setScore(Integer score) {
        this.score = score;
    }
    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }
    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
    
    public MilestoneSubmission(Long id, Long enrollment_id, Long milestone_id, String contentUrl, String status,
            Integer score, LocalDateTime submittedAt) {
        this.id = id;
        this.enrollment_id = enrollment_id;
        this.milestone_id = milestone_id;
        this.contentUrl = contentUrl;
        this.status = status;
        this.score = score;
        this.submittedAt = submittedAt;
    }

}
