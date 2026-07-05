package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roadmap_milestone")
public class RoadmapMilestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roadmap_id", nullable = false)
    private LearningRoadmap roadmap;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer expectedDurationDays;

    @Column(nullable = false)
    private Integer passingScore = 50;

    public RoadmapMilestone() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LearningRoadmap getRoadmap() { return roadmap; }
    public void setRoadmap(LearningRoadmap roadmap) { this.roadmap = roadmap; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getExpectedDurationDays() { return expectedDurationDays; }
    public void setExpectedDurationDays(Integer expectedDurationDays) { this.expectedDurationDays = expectedDurationDays; }
    public Integer getPassingScore() { return passingScore; }
    public void setPassingScore(Integer passingScore) { this.passingScore = passingScore; }
}
