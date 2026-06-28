package com.example.demo.dto;

import java.time.LocalDateTime;

public class SubmissionResponseDto {

    private Long id;
    private Long enrollmentId;
    private Long milestoneId;
    private String contentUrl;
    private Integer score;
    private String status;
    private LocalDateTime submittedAt;

    public SubmissionResponseDto() {
    }

    public SubmissionResponseDto(Long id, Long enrollmentId,
                                 Long milestoneId, String contentUrl,
                                 Integer score, String status,
                                 LocalDateTime submittedAt) {
        this.id = id;
        this.enrollmentId = enrollmentId;
        this.milestoneId = milestoneId;
        this.contentUrl = contentUrl;
        this.score = score;
        this.status = status;
        this.submittedAt = submittedAt;
    }

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

    public Integer getScore() {
        return score;
    }
    public void setScore(Integer score) {
        this.score = score;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }
    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
}