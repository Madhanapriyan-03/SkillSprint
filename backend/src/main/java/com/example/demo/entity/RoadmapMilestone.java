package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roadmap_milestone")
public class RoadmapMilestone {
    @Id
    @
    private Long id;
    private Long roadmapId;
    private String title;

}
