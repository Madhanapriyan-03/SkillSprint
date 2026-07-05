package com.example.demo.controller;

import com.example.demo.dto.MilestoneRequestDto;
import com.example.demo.dto.MilestoneResponseDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.service.MilestoneService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/milestones")
public class MileStoneController {
    private final MilestoneService service;

    public MileStoneController(MilestoneService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponseDto<MilestoneResponseDto> getByRoadmap(@RequestParam Long roadmapId, Pageable pageable) {
        return service.getMilestonesByRoadmap(roadmapId, pageable);
    }

    @GetMapping("/{id}")
    public MilestoneResponseDto getById(@PathVariable Long id) {
        return service.getMilestoneById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public MilestoneResponseDto create(@Valid @RequestBody MilestoneRequestDto dto) {
        return service.createMilestone(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public MilestoneResponseDto update(@PathVariable Long id, @Valid @RequestBody MilestoneRequestDto dto) {
        return service.updateMilestone(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public org.springframework.http.ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteMilestone(id);
        return org.springframework.http.ResponseEntity.ok("Milestone deleted successfully.");
    }
}
