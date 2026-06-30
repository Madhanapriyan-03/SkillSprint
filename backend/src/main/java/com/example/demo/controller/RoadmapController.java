package com.example.demo.controller;

import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.RoadmapRequestDto;
import com.example.demo.dto.RoadmapResponseDto;
import com.example.demo.service.RoadmapService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {
    private final RoadmapService service;

    public RoadmapController(RoadmapService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponseDto<RoadmapResponseDto> getAll(Pageable pageable) {
        return service.getAllRoadmaps(pageable);
    }

    @GetMapping("/{id}")
    public RoadmapResponseDto getById(@PathVariable Long id) {
        return service.getRoadmapById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public RoadmapResponseDto create(@Valid @RequestBody RoadmapRequestDto dto) {
        return service.createRoadmap(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public RoadmapResponseDto update(@PathVariable Long id, @Valid @RequestBody RoadmapRequestDto dto) {
        return service.updateRoadmap(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public org.springframework.http.ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteRoadmap(id);
        return org.springframework.http.ResponseEntity.ok("Roadmap deleted successfully.");
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasAnyRole('MENTOR', 'LEARNING_MANAGER')")
    public RoadmapResponseDto publish(@PathVariable Long id) {
        return service.publishRoadmap(id);
    }
}
