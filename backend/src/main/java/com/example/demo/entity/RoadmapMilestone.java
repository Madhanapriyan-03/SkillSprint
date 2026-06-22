package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "roadmap_milestone")
public class RoadmapMilestone {
    private Long id;
    private Long roadmap_id;
    private String title;
    
}
