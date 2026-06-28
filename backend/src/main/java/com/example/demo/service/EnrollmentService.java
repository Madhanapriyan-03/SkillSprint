package com.example.demo.service;

import org.springframework.data.domain.Pageable;

import com.example.demo.dto.EnrollmentRequestDto;
import com.example.demo.dto.EnrollmentResponseDto;
import com.example.demo.dto.PageResponseDto;

public interface EnrollmentService {

    PageResponseDto<EnrollmentResponseDto> getAllEnrollments(Pageable pageable);

    EnrollmentResponseDto getEnrollmentById(Long id);

    EnrollmentResponseDto createEnrollment(EnrollmentRequestDto dto);

    EnrollmentResponseDto updateEnrollment(Long id, EnrollmentRequestDto dto);

    void deleteEnrollment(Long id);

    EnrollmentResponseDto dropEnrollment(Long id);

}