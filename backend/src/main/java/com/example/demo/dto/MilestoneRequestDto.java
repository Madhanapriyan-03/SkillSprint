package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MilestoneRequestDto {
    @NotNull
    private Long roadmapId;

    @NotBlank
    private String title;

    @Min(1)
    private Integer expectedDurationDays;

    @Min(1)
    private Integer passingScore;

    public MilestoneRequestDto() {}

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

    public Integer getExpectedDurationDays() { 
        return expectedDurationDays; 
    }
    public void setExpectedDurationDays(Integer expectedDurationDays) { 
        this.expectedDurationDays = expectedDurationDays; 
    }

    public Integer getPassingScore() { 
        return passingScore; 
    }
    public void setPassingScore(Integer passingScore) { 
        this.passingScore = passingScore; 
    }
}
