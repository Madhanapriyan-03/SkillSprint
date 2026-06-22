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
    private 


}
