package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "learning_roadmap")

public class LearningRoadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private Long mentor_id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private Integer maxCapacity;
    private String status;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getMentor_id() {
        return mentor_id;
    }
    public void setMentor_id(Long mentor_id) {
        this.mentor_id = mentor_id;
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
    public Integer getMaxCapacity() {
        return maxCapacity;
    }
    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LearningRoadmap(Long id, @NotBlank Long mentor_id, String title, String description, Integer maxCapacity,
            String status) {
        this.id = id;
        this.mentor_id = mentor_id;
        this.title = title;
        this.description = description;
        this.maxCapacity = maxCapacity;
        this.status = status;
    }

}
