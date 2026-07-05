package com.example.demo.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class GradeRequestDto {
    @NotNull
    @Min(0)
    @Max(100)
    private Integer score;

    public GradeRequestDto() {}

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
}

