package com.example.demo.dto;

public class EnrollmentRequestDto {
    private Long studentId;
    private Long roadmapId;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getRoadmapId() {
        return roadmapId;
    }

    public void setRoadmapId(Long roadmapId) {
        this.roadmapId = roadmapId;
    }

    public EnrollmentRequestDto() {
    }

    public EnrollmentRequestDto(Long studentId, Long roadmapId) {
        this.studentId = studentId;
        this.roadmapId = roadmapId;
    }
    
}
