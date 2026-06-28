package com.example.demo.dto;

public class MilestoneRequestDto {

    private Long roadmapId;
    private String title;
    private Integer expectedDurationDays;
    private Integer passingScore;

    public MilestoneRequestDto() {
    }

    public MilestoneRequestDto(Long roadmapId,
                               String title,
                               Integer expectedDurationDays,
                               Integer passingScore) {
        this.roadmapId = roadmapId;
        this.title = title;
        this.expectedDurationDays = expectedDurationDays;
        this.passingScore = passingScore;
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