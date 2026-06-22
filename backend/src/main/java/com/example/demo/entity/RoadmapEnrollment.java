package com.example.demo.entity;

import java.time.LocalDateTime;

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
    private Long student_id;
    private Long roadmap_id;
    private String status;
    private Integer progressPercentage;
    private LocalDateTime enrolledAt;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getStudent_id() {
        return student_id;
    }
    public void setStudent_id(Long student_id) {
        this.student_id = student_id;
    }
    public Long getRoadmap_id() {
        return roadmap_id;
    }
    public void setRoadmap_id(Long roadmap_id) {
        this.roadmap_id = roadmap_id;
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
    public RoadmapEnrollment(Long id, Long student_id, Long roadmap_id, String status, Integer progressPercentage,
            LocalDateTime enrolledAt) {
        this.id = id;
        this.student_id = student_id;
        this.roadmap_id = roadmap_id;
        this.status = status;
        this.progressPercentage = progressPercentage;
        this.enrolledAt = enrolledAt;
    }


}
