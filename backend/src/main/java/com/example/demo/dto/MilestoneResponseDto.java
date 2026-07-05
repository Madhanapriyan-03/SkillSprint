package com.example.demo.dto;

public class MilestoneResponseDto {
    private Long id;
    private Long roadmapId;
    private String title;
    private Integer expectedDurationDays;
    private Integer passingScore;

    public MilestoneResponseDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getRoadmapId() { return roadmapId; }
    public void setRoadmapId(Long roadmapId) { this.roadmapId = roadmapId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getExpectedDurationDays() { return expectedDurationDays; }
    public void setExpectedDurationDays(Integer expectedDurationDays) { this.expectedDurationDays = expectedDurationDays; }
    public Integer getPassingScore() { return passingScore; }
    public void setPassingScore(Integer passingScore) { this.passingScore = passingScore; }
}
