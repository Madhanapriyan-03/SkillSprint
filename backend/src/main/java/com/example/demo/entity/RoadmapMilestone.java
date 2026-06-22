package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roadmap_milestone")
public class RoadmapMilestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "roadmap_id")
    private Long roadmapId;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private Integer orderIndex;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getRoadmapId() {
        return roadmapId;
    }
    public void setRoadmapId(Long roadmapId) {
        this.roadmapId = roadmapId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getOrderIndex() {
        return orderIndex;
    }
    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public RoadmapMilestone(Long id, Long roadmapId, String title, String description, Integer orderIndex) {
        this.id = id;
        this.roadmapId = roadmapId;
        this.title = title;
        this.description = description;
        this.orderIndex = orderIndex;
    }

    public RoadmapMilestone() {
    }
    
}
