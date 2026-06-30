package com.example.demo.service;

import com.example.demo.dto.EnrollmentRequestDto;
import com.example.demo.dto.EnrollmentResponseDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.entity.LearningRoadmap;
import com.example.demo.entity.RoadmapEnrollment;
import com.example.demo.entity.SprintAccount;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.LearningRoadmapRepository;
import com.example.demo.repository.RoadmapEnrollmentRepository;
import com.example.demo.repository.SprintAccountRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final RoadmapEnrollmentRepository repository;
    private final LearningRoadmapRepository roadmapRepository;
    private final SprintAccountRepository accountRepository;

    public EnrollmentService(
            RoadmapEnrollmentRepository repository,
            LearningRoadmapRepository roadmapRepository,
            SprintAccountRepository accountRepository) {
        this.repository = repository;
        this.roadmapRepository = roadmapRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional(readOnly = true)
    public PageResponseDto<EnrollmentResponseDto> getAllEnrollments(Pageable pageable) {
        Page<RoadmapEnrollment> page = repository.findAll(pageable);

        return new PageResponseDto<>(
                page.getContent().stream().map(this::mapToDto).collect(Collectors.toList()),
                page.getNumber(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }

    public EnrollmentResponseDto getEnrollmentById(Long id) {
        return mapToDto(findById(id));
    }

    @Transactional
    public EnrollmentResponseDto createEnrollment(EnrollmentRequestDto dto) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        SprintAccount student = accountRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        LearningRoadmap roadmap = roadmapRepository.findById(dto.getRoadmapId())
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));

        if (!"PUBLISHED".equals(roadmap.getStatus())) {
            throw new BusinessValidationException("Can only enroll in published roadmaps");
        }

        if (repository.findByStudentIdAndRoadmapId(student.getId(), roadmap.getId()).isPresent()) {
            throw new BusinessValidationException("Already enrolled in this roadmap");
        }

        long currentEnrollments = repository.countByRoadmapId(roadmap.getId());

        if (currentEnrollments >= roadmap.getMaxCapacity()) {
            throw new BusinessValidationException("Roadmap has reached max capacity");
        }

        RoadmapEnrollment enrollment = new RoadmapEnrollment();
        enrollment.setStudent(student);
        enrollment.setRoadmap(roadmap);
        enrollment.setStatus("ACTIVE");
        enrollment.setProgressPercentage(0);
        enrollment.setEnrolledAt(LocalDateTime.now());

        return mapToDto(repository.save(enrollment));
    }

    public EnrollmentResponseDto updateEnrollment(Long id, EnrollmentRequestDto dto) {
        RoadmapEnrollment enrollment = findById(id);
        return mapToDto(repository.save(enrollment));
    }

    public void deleteEnrollment(Long id) {
        RoadmapEnrollment enrollment = findById(id);
        repository.delete(enrollment);
    }

    public EnrollmentResponseDto dropEnrollment(Long id) {
        RoadmapEnrollment enrollment = findById(id);

        if (!"ACTIVE".equals(enrollment.getStatus())) {
            throw new BusinessValidationException("Only ACTIVE enrollments can be dropped");
        }

        enrollment.setStatus("DROPPED");

        return mapToDto(repository.save(enrollment));
    }

    private RoadmapEnrollment findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));
    }

    private EnrollmentResponseDto mapToDto(RoadmapEnrollment entity) {
        EnrollmentResponseDto dto = new EnrollmentResponseDto();

        dto.setId(entity.getId());
        dto.setStudentId(entity.getStudent().getId());
        dto.setRoadmapId(entity.getRoadmap().getId());
        dto.setRoadmapTitle(entity.getRoadmap().getTitle());
        dto.setStatus(entity.getStatus());
        dto.setProgressPercentage(entity.getProgressPercentage());
        dto.setEnrolledAt(entity.getEnrolledAt());

        return dto;
    }
}