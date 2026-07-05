package com.example.demo.dto;

import java.time.LocalDateTime;

public class EnrollmentResponseDto {
    private Long id;
    private Long studentId;
    private Long roadmapId;
    private String roadmapTitle;
    private String status;
    private Integer progressPercentage;
    private LocalDateTime enrolledAt;

    public EnrollmentResponseDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Long getRoadmapId() { return roadmapId; }
    public void setRoadmapId(Long roadmapId) { this.roadmapId = roadmapId; }
    public String getRoadmapTitle() { return roadmapTitle; }
    public void setRoadmapTitle(String roadmapTitle) { this.roadmapTitle = roadmapTitle; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; }
    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }
}

