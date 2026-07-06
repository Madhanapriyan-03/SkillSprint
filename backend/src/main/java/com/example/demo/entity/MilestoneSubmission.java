package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "milestone_submission")
public class MilestoneSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private RoadmapEnrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestone_id", nullable = false)
    private RoadmapMilestone milestone;

    @Column(nullable = false)
    private String contentUrl;

    @Column
    private Integer score;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    public MilestoneSubmission() {}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public RoadmapEnrollment getEnrollment() { 
        return enrollment; 
    }
    public void setEnrollment(RoadmapEnrollment enrollment) { 
        this.enrollment = enrollment; 
    }

    public RoadmapMilestone getMilestone() { 
        return milestone; 
    }
    public void setMilestone(RoadmapMilestone milestone) { 
        this.milestone = milestone; 
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
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
