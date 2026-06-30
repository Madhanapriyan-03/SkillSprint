
package com.example.demo.controller;

import com.example.demo.dto.GradeRequestDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.SubmissionRequestDto;
import com.example.demo.dto.SubmissionResponseDto;
import com.example.demo.service.SubmissionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
    private final SubmissionService service;

    public SubmissionController(SubmissionService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponseDto<SubmissionResponseDto> getAll(Pageable pageable) {
        return service.getAllSubmissions(pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER') or @securityService.isSubmissionOwner(authentication, #id)")
    public SubmissionResponseDto getById(@PathVariable Long id) {
        return service.getSubmissionById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('STUDENT', 'LEARNING_MANAGER')")
    public SubmissionResponseDto create(@Valid @RequestBody SubmissionRequestDto dto) {
        return service.createSubmission(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'LEARNING_MANAGER') and @securityService.isSubmissionOwner(authentication, #id)")
    public SubmissionResponseDto update(@PathVariable Long id, @Valid @RequestBody SubmissionRequestDto dto) {
        return service.updateSubmission(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('STUDENT', 'LEARNING_MANAGER') and @securityService.isSubmissionOwner(authentication, #id)")
    public void delete(@PathVariable Long id) {
        service.deleteSubmission(id);
    }

    @PutMapping("/{id}/grade")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public SubmissionResponseDto grade(@PathVariable Long id, @Valid @RequestBody GradeRequestDto dto) {
        return service.gradeSubmission(id, dto);
    }
}
