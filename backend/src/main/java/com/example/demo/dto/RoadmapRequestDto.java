package com.example.demo.dto;

public class RoadmapRequestDto {

    private String title;
    private String description;
    private Integer maxCapacity;

    public RoadmapRequestDto() {
    }

    public RoadmapRequestDto(String title,
                             String description,
                             Integer maxCapacity) {
        this.title = title;
        this.description = description;
        this.maxCapacity = maxCapacity;
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
}