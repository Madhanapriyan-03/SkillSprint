package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;

public class EnrollmentRequestDto {
    @NotNull
    private Long roadmapId;

    public EnrollmentRequestDto() {}

    public Long getRoadmapId() { 
        return roadmapId; 
    }
    public void setRoadmapId(Long roadmapId) { 
        this.roadmapId = roadmapId; 
    }
}
