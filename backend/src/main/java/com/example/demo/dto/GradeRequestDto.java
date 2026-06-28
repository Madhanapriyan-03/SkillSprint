package com.example.demo.dto;

public class GradeRequestDto {

    private Integer score;

    public GradeRequestDto() {
    }

    public GradeRequestDto(Integer score) {
        this.score = score;
    }

    public Integer getScore() {
        return score;
    }
    public void setScore(Integer score) {
        this.score = score;
    }
}