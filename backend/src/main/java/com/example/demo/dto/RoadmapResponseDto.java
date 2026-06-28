package com.example.demo.dto;

public class RoadmapResponseDto {

    private Long id;
    private Long mentorId;
    private String title;
    private String description;
    private Integer maxCapacity;
    private String status;

    public RoadmapResponseDto() {
    }

    public RoadmapResponseDto(Long id, Long mentorId, String title,
                              String description, Integer maxCapacity,
                              String status) {
        this.id = id;
        this.mentorId = mentorId;
        this.title = title;
        this.description = description;
        this.maxCapacity = maxCapacity;
        this.status = status;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getMentorId() {
        return mentorId;
    }
    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
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
}