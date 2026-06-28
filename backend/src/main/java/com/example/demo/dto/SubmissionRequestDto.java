package com.example.demo.dto;

public class SubmissionRequestDto {

    private Long enrollmentId;
    private Long milestoneId;
    private String contentUrl;

    public SubmissionRequestDto() {
    }

    public SubmissionRequestDto(Long enrollmentId, Long milestoneId,
                                String contentUrl) {
        this.enrollmentId = enrollmentId;
        this.milestoneId = milestoneId;
        this.contentUrl = contentUrl;
    }

    public Long getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public Long getMilestoneId() {
        return milestoneId;
    }

    public void setMilestoneId(Long milestoneId) {
        this.milestoneId = milestoneId;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }
}