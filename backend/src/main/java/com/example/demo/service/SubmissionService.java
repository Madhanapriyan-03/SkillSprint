package com.example.demo.service;

import org.springframework.data.domain.Pageable;

import com.example.demo.dto.GradeRequestDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.SubmissionRequestDto;
import com.example.demo.dto.SubmissionResponseDto;

public interface SubmissionService {

    PageResponseDto<SubmissionResponseDto> getAllSubmissions(Pageable pageable);

    SubmissionResponseDto getSubmissionById(Long id);

    SubmissionResponseDto createSubmission(SubmissionRequestDto dto);

    SubmissionResponseDto updateSubmission(Long id, SubmissionRequestDto dto);

    void deleteSubmission(Long id);

    SubmissionResponseDto gradeSubmission(Long id, GradeRequestDto dto);

}