package com.example.demo.controller;

import com.example.demo.dto.EnrollmentRequestDto;
import com.example.demo.dto.EnrollmentResponseDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    private final EnrollmentService service;

    public EnrollmentController(EnrollmentService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponseDto<EnrollmentResponseDto> getAll(Pageable pageable) {
        return service.getAllEnrollments(pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER') or @securityService.isEnrollmentOwner(authentication, #id)")
    public EnrollmentResponseDto getById(@PathVariable Long id) {
        return service.getEnrollmentById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('STUDENT', 'LEARNING_MANAGER')")
    public EnrollmentResponseDto create(@Valid @RequestBody EnrollmentRequestDto dto) {
        return service.createEnrollment(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('LEARNING_MANAGER')")
    public EnrollmentResponseDto update(@PathVariable Long id, @Valid @RequestBody EnrollmentRequestDto dto) {
        return service.updateEnrollment(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('LEARNING_MANAGER')")
    public org.springframework.http.ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteEnrollment(id);
        return org.springframework.http.ResponseEntity.ok("Enrollment deleted successfully.");
    }

    @PutMapping("/{id}/drop")
    @PreAuthorize("hasRole('STUDENT') and @securityService.isEnrollmentOwner(authentication, #id)")
    public EnrollmentResponseDto drop(@PathVariable Long id) {
        return service.dropEnrollment(id);
    }
}
