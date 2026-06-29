package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.RoadmapRequestDto;
import com.example.demo.dto.RoadmapResponseDto;
import com.example.demo.entity.LearningRoadmap;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.LearningRoadmapRepository;
import com.example.demo.repository.MilestoneSubmissionRepository;
import com.example.demo.repository.RoadmapEnrollmentRepository;
import com.example.demo.repository.RoadmapMilestoneRepository;

@Service
public class RoadmapService {

    @Autowired
    private LearningRoadmapRepository roadmapRepository;

    @Autowired
    private RoadmapEnrollmentRepository enrollmentRepository;

    @Autowired
    private RoadmapMilestoneRepository milestoneRepository;

    @Autowired
    private MilestoneSubmissionRepository submissionRepository;

    public PageResponseDto<RoadmapResponseDto> getAllRoadmaps(Pageable pageable) {

        Page<LearningRoadmap> page = roadmapRepository.findAll(pageable);

        PageResponseDto<RoadmapResponseDto> response = new PageResponseDto<>();

        response.setContent(page.map(this::convertToDto).getContent());
        response.setCurrentPage(page.getNumber());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());

        return response;
    }

    public RoadmapResponseDto getRoadmapById(Long id) {

        LearningRoadmap roadmap = roadmapRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));

        return convertToDto(roadmap);
    }

    public RoadmapResponseDto createRoadmap(RoadmapRequestDto dto) {

        LearningRoadmap roadmap = new LearningRoadmap();

        roadmap.setTitle(dto.getTitle());
        roadmap.setDescription(dto.getDescription());
        roadmap.setMaxCapacity(dto.getMaxCapacity());
        roadmap.setStatus("DRAFT");

        roadmap = roadmapRepository.save(roadmap);

        return convertToDto(roadmap);
    }

    public RoadmapResponseDto updateRoadmap(Long id, RoadmapRequestDto dto) {

        LearningRoadmap roadmap = roadmapRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));

        roadmap.setTitle(dto.getTitle());
        roadmap.setDescription(dto.getDescription());
        roadmap.setMaxCapacity(dto.getMaxCapacity());

        roadmap = roadmapRepository.save(roadmap);

        return convertToDto(roadmap);
    }

    public void deleteRoadmap(Long id) {

        roadmapRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));

        submissionRepository.deleteAllByRoadmapId(id);
        enrollmentRepository.deleteAllByRoadmapId(id);
        milestoneRepository.deleteAllByRoadmapId(id);

        roadmapRepository.deleteById(id);
    }

    public RoadmapResponseDto publishRoadmap(Long id) {

        LearningRoadmap roadmap = roadmapRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));

        roadmap.setStatus("PUBLISHED");

        roadmap = roadmapRepository.save(roadmap);

        return convertToDto(roadmap);
    }

    private RoadmapResponseDto convertToDto(LearningRoadmap roadmap) {

        RoadmapResponseDto dto = new RoadmapResponseDto();

        dto.setId(roadmap.getId());
        dto.setTitle(roadmap.getTitle());
        dto.setDescription(roadmap.getDescription());
        dto.setMaxCapacity(roadmap.getMaxCapacity());
        dto.setStatus(roadmap.getStatus());
        dto.setMentorName("Mentor");

        return dto;
    }
}