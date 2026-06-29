package com.example.demo.controller;

import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.RoadmapRequestDto;
import com.example.demo.dto.RoadmapResponseDto;
import com.example.demo.service.RoadmapService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<RoadmapResponseDto>> getAll(Pageable pageable) {
        return ResponseEntity.ok(roadmapService.getAllRoadmaps(pageable));
    }

    @GetMapping("/{id}")
    public RoadmapResponseDto getById(@PathVariable Long id) {
        return roadmapService.getRoadmapById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoadmapResponseDto create(@Valid @RequestBody RoadmapRequestDto dto) {
        return roadmapService.createRoadmap(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoadmapResponseDto> update(@PathVariable Long id,
                                                     @Valid @RequestBody RoadmapRequestDto dto) {
        return ResponseEntity.ok(roadmapService.updateRoadmap(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        roadmapService.deleteRoadmap(id);
        return ResponseEntity.ok("Roadmap deleted successfully.");
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<RoadmapResponseDto> publish(@PathVariable Long id) {
        return ResponseEntity.ok(roadmapService.publishRoadmap(id));
    }
}