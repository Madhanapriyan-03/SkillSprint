package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
    @Column(name = "enrollment_id")
    private Long enrollmentId;
    @Column(name = "milestone_id")
    private Long milestoneId;
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
    public Long getEnrollmentId() {
        return enrollmentId;
    }
    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
    }
    public Long getMilestoneId() {
        return milestoneId;
    }
    public void setMilestoneId(Long milestoneId) {
        this.milestoneId = milestoneId;
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
    
    public MilestoneSubmission(Long id, Long enrollmentId, Long milestoneId, String contentUrl, String status,
            Integer score, LocalDateTime submittedAt) {
        this.id = id;
        this.enrollmentId = enrollmentId;
        this.milestoneId = milestoneId;
        this.contentUrl = contentUrl;
        this.status = status;
        this.score = score;
        this.submittedAt = submittedAt;
    }
    public MilestoneSubmission() {
    }

}
