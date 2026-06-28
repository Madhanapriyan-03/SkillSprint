package com.example.demo.service;

import org.springframework.data.domain.Pageable;

import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.RoadmapRequestDto;
import com.example.demo.dto.RoadmapResponseDto;

public interface RoadmapService {

    PageResponseDto<RoadmapResponseDto> getAllRoadmaps(Pageable pageable);

    RoadmapResponseDto getRoadmapById(Long id);

    RoadmapResponseDto createRoadmap(RoadmapRequestDto dto);

    RoadmapResponseDto updateRoadmap(Long id, RoadmapRequestDto dto);

    void deleteRoadmap(Long id);

    RoadmapResponseDto publishRoadmap(Long id);

}