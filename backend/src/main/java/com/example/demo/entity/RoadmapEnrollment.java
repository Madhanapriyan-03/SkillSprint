package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roadmap_enrollment")

public class RoadmapEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "student_id")
    private Long studentId;
    @Column(name = "roadmap_id")
    private Long roadmapId;
    private String status;
    private Integer progressPercentage;
    private LocalDateTime enrolledAt;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getStudentId() {
        return studentId;
    }
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    public Long getRoadmapId() {
        return roadmapId;
    }
    public void setRoadmapId(Long roadmapId) {
        this.roadmapId = roadmapId;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Integer getProgressPercentage() {
        return progressPercentage;
    }
    public void setProgressPercentage(Integer progressPercentage) {
        this.progressPercentage = progressPercentage;
    }
    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }
    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
    public RoadmapEnrollment(Long id, Long studentId, Long roadmapId, String status, Integer progressPercentage,
            LocalDateTime enrolledAt) {
        this.id = id;
        this.studentId = studentId;
        this.roadmapId = roadmapId;
        this.status = status;
        this.progressPercentage = progressPercentage;
        this.enrolledAt = enrolledAt;
    }
    
    public RoadmapEnrollment() {
    }

}
