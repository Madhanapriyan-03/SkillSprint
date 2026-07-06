package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "roadmap_enrollment")
public class RoadmapEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private SprintAccount student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roadmap_id", nullable = false)
    private LearningRoadmap roadmap;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Integer progressPercentage = 0;

    @Column(nullable = false)
    private LocalDateTime enrolledAt;

    public RoadmapEnrollment() {}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public SprintAccount getStudent() { 
        return student; 
    }
    public void setStudent(SprintAccount student) { 
        this.student = student; 
    }

    public LearningRoadmap getRoadmap() { 
        return roadmap; 
    }
    public void setRoadmap(LearningRoadmap roadmap) { 
        this.roadmap = roadmap; 
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
}
