package com.example.demo.service;

import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.RoadmapRequestDto;
import java.util.List;
import com.example.demo.dto.RoadmapResponseDto;
import com.example.demo.entity.LearningRoadmap;
import com.example.demo.entity.SprintAccount;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.LearningRoadmapRepository;
import com.example.demo.repository.MilestoneSubmissionRepository;
import com.example.demo.repository.RoadmapEnrollmentRepository;
import com.example.demo.repository.RoadmapMilestoneRepository;
import com.example.demo.repository.SprintAccountRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class RoadmapService {
    private final LearningRoadmapRepository repository;
    private final SprintAccountRepository accountRepository;
    private final RoadmapMilestoneRepository milestoneRepository;
    private final RoadmapEnrollmentRepository enrollmentRepository;
    private final MilestoneSubmissionRepository submissionRepository;

    public RoadmapService(LearningRoadmapRepository repository, SprintAccountRepository accountRepository,
            RoadmapMilestoneRepository milestoneRepository, RoadmapEnrollmentRepository enrollmentRepository,
            MilestoneSubmissionRepository submissionRepository) {
        this.repository = repository;
        this.accountRepository = accountRepository;
        this.milestoneRepository = milestoneRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.submissionRepository = submissionRepository;
    }

    @Transactional(readOnly = true)
    public PageResponseDto<RoadmapResponseDto> getAllRoadmaps(Pageable pageable) {
        Page<LearningRoadmap> page = repository.findAll(pageable);
        return new PageResponseDto<>(
                page.getContent().stream().map(this::mapToDto).collect(Collectors.toList()),
                page.getNumber(),
                page.getTotalElements(),
                page.getTotalPages());
    }

    public RoadmapResponseDto getRoadmapById(Long id) {
        return mapToDto(findById(id));
    }

    public RoadmapResponseDto createRoadmap(RoadmapRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        SprintAccount mentor = accountRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found"));

        LearningRoadmap roadmap = new LearningRoadmap();
        roadmap.setTitle(dto.getTitle());
        roadmap.setDescription(dto.getDescription());
        roadmap.setMaxCapacity(dto.getMaxCapacity());
        roadmap.setStatus("DRAFT");
        roadmap.setMentor(mentor);
        roadmap.setCreatedAt(LocalDateTime.now());

        return mapToDto(repository.save(roadmap));
    }

    public RoadmapResponseDto updateRoadmap(Long id, RoadmapRequestDto dto) {
        LearningRoadmap roadmap = findById(id);
        if (!"DRAFT".equals(roadmap.getStatus())) {
            throw new BusinessValidationException("Cannot update roadmap unless it is in DRAFT status");
        }
        roadmap.setTitle(dto.getTitle());
        roadmap.setDescription(dto.getDescription());
        roadmap.setMaxCapacity(dto.getMaxCapacity());
        return mapToDto(repository.save(roadmap));
    }

    @Transactional
    public void deleteRoadmap(Long id) {
        LearningRoadmap roadmap = findById(id);
        submissionRepository.deleteAllByRoadmapId(id);
        enrollmentRepository.deleteAllByRoadmapId(id);
        milestoneRepository.deleteAllByRoadmapId(id);
        repository.delete(roadmap);
    }

    public RoadmapResponseDto publishRoadmap(Long id) {
        LearningRoadmap roadmap = findById(id);

        roadmap.setStatus("PUBLISHED");
        return mapToDto(repository.save(roadmap));
    }

    private LearningRoadmap findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));
    }

    private RoadmapResponseDto mapToDto(LearningRoadmap entity) {
        RoadmapResponseDto dto = new RoadmapResponseDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setMaxCapacity(entity.getMaxCapacity());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setMentorName(entity.getMentor().getEmail());
        return dto;
    }
}
