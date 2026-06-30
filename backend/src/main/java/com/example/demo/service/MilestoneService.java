package com.example.demo.service;

import com.example.demo.dto.MilestoneRequestDto;
import com.example.demo.dto.MilestoneResponseDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.entity.LearningRoadmap;
import com.example.demo.entity.RoadmapMilestone;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.LearningRoadmapRepository;
import com.example.demo.repository.RoadmapMilestoneRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class MilestoneService {

    private final RoadmapMilestoneRepository repository;
    private final LearningRoadmapRepository roadmapRepository;

    public MilestoneService(
            RoadmapMilestoneRepository repository,
            LearningRoadmapRepository roadmapRepository) {
        this.repository = repository;
        this.roadmapRepository = roadmapRepository;
    }

    @Transactional(readOnly = true)
    public PageResponseDto<MilestoneResponseDto> getMilestonesByRoadmap(Long roadmapId, Pageable pageable) {
        Page<RoadmapMilestone> page = repository.findByRoadmapId(roadmapId, pageable);

        return new PageResponseDto<>(
                page.getContent().stream().map(this::mapToDto).collect(Collectors.toList()),
                page.getNumber(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }

    public MilestoneResponseDto getMilestoneById(Long id) {
        return mapToDto(findById(id));
    }

    public MilestoneResponseDto createMilestone(MilestoneRequestDto dto) {
        LearningRoadmap roadmap = roadmapRepository.findById(dto.getRoadmapId())
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));

        if (!"DRAFT".equals(roadmap.getStatus())) {
            throw new BusinessValidationException("Can only add milestones to DRAFT roadmaps");
        }

        RoadmapMilestone milestone = new RoadmapMilestone();
        milestone.setRoadmap(roadmap);
        milestone.setTitle(dto.getTitle());
        milestone.setExpectedDurationDays(dto.getExpectedDurationDays());
        milestone.setPassingScore(dto.getPassingScore());

        return mapToDto(repository.save(milestone));
    }

    public MilestoneResponseDto updateMilestone(Long id, MilestoneRequestDto dto) {
        RoadmapMilestone milestone = findById(id);

        if (!"DRAFT".equals(milestone.getRoadmap().getStatus())) {
            throw new BusinessValidationException("Cannot modify milestones of a published roadmap");
        }

        milestone.setTitle(dto.getTitle());
        milestone.setExpectedDurationDays(dto.getExpectedDurationDays());
        milestone.setPassingScore(dto.getPassingScore());

        return mapToDto(repository.save(milestone));
    }

    public void deleteMilestone(Long id) {
        RoadmapMilestone milestone = findById(id);

        if (!"DRAFT".equals(milestone.getRoadmap().getStatus())) {
            throw new BusinessValidationException("Cannot delete milestones from a published roadmap");
        }

        repository.delete(milestone);
    }

    private RoadmapMilestone findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found"));
    }

    private MilestoneResponseDto mapToDto(RoadmapMilestone entity) {
        MilestoneResponseDto dto = new MilestoneResponseDto();

        dto.setId(entity.getId());
        dto.setRoadmapId(entity.getRoadmap().getId());
        dto.setTitle(entity.getTitle());
        dto.setExpectedDurationDays(entity.getExpectedDurationDays());
        dto.setPassingScore(entity.getPassingScore());

        return dto;
    }
}