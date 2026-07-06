package com.example.demo.dto;

import java.time.LocalDateTime;

public class RoadmapResponseDto {
    private Long id;
    private String title;
    private String description;
    private Integer maxCapacity;
    private String status;
    private LocalDateTime createdAt;
    private String mentorName;

    public RoadmapResponseDto() {}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
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

    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    }
    public void setCreatedAt(LocalDateTime createdAt) { 
        this.createdAt = createdAt; 
    }
    public String getMentorName() { 
        return mentorName; }
    public void setMentorName(String mentorName) { this.mentorName = mentorName; }
}

