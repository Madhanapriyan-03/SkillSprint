package com.example.demo.dto;

public class EnrollmentRequestDto {
    private Long roadmapId;

    public Long getRoadmapId() {
        return roadmapId;
    }
    public void setRoadmapId(Long roadmapId) {
        this.roadmapId = roadmapId;
    }

    public EnrollmentRequestDto() {
    }

    public EnrollmentRequestDto(Long roadmapId) {
        this.roadmapId = roadmapId;
    }
    
}
