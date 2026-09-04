package com.example.demo.service;

import com.example.demo.dto.EnrollmentRequestDto;
import com.example.demo.dto.EnrollmentResponseDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.entity.RoadmapEnrollment;
import com.example.demo.entity.SprintAccount;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.RoadmapEnrollmentRepository;
import com.example.demo.repository.RoadmapRepository;
import com.example.demo.repository.SprintAccountRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final RoadmapEnrollmentRepository repository;
    private final RoadmapRepository roadmapRepository;
    private final SprintAccountRepository accountRepository;

    public EnrollmentService(
            RoadmapEnrollmentRepository repository,
            RoadmapRepository roadmapRepository,
            SprintAccountRepository accountRepository) {

        this.repository = repository;
        this.roadmapRepository = roadmapRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional(readOnly = true)
    public PageResponseDto<EnrollmentResponseDto> getAllEnrollments(
            Pageable pageable) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        Page<RoadmapEnrollment> page;

        /*
         * STUDENT:
         * Show only the enrollments belonging to
         * the currently logged-in student.
         *
         * MENTOR / LEARNING_MANAGER:
         * Keep existing behavior and show all enrollments.
         */
        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            page = repository.findByStudentId(
                    student.getId(),
                    pageable
            );

        } else {

            page = repository.findAll(pageable);
        }

        return new PageResponseDto<>(
                page.getContent()
                        .stream()
                        .map(this::mapToDto)
                        .collect(Collectors.toList()),
                page.getNumber(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }

    @Transactional(readOnly = true)
    public EnrollmentResponseDto getEnrollmentById(Long id) {

        RoadmapEnrollment enrollment = findById(id);

        /*
         * Student should only be able to view
         * their own enrollment.
         */
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            if (!enrollment.getStudent()
                    .getId()
                    .equals(student.getId())) {

                throw new BusinessValidationException(
                        "You can only access your own enrollment"
                );
            }
        }

        return mapToDto(enrollment);
    }

    @Transactional
    public EnrollmentResponseDto createEnrollment(
            EnrollmentRequestDto dto) {

        RoadmapEnrollment enrollment =
                new RoadmapEnrollment();

        /*
         * STUDENT:
         * Always create enrollment for the currently
         * logged-in student.
         */
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            enrollment.setStudent(student);

        } else {

            /*
             * Keep the existing behavior for
             * Learning Manager if the request contains
             * a student ID.
             */
            SprintAccount student =
                    accountRepository.findById(dto.getStudentId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Student not found"
                                    ));

            enrollment.setStudent(student);
        }

        enrollment.setRoadmap(
                roadmapRepository.findById(dto.getRoadmapId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Roadmap not found"
                                ))
        );

        /*
         * Prevent duplicate enrollment for the
         * same student and roadmap.
         */
        if (repository.existsByStudentIdAndRoadmapId(
                enrollment.getStudent().getId(),
                enrollment.getRoadmap().getId())) {

            throw new BusinessValidationException(
                    "Student is already enrolled in this roadmap"
            );
        }

        enrollment.setStatus("ACTIVE");
        enrollment.setProgressPercentage(0);
        enrollment.setEnrolledAt(LocalDateTime.now());

        return mapToDto(
                repository.save(enrollment)
        );
    }

    @Transactional
    public EnrollmentResponseDto updateEnrollment(
            Long id,
            EnrollmentRequestDto dto) {

        RoadmapEnrollment enrollment = findById(id);

        /*
         * Only Learning Manager should normally update
         * enrollment details. Existing controller/security
         * rules remain responsible for role protection.
         */
        if (dto.getStatus() != null) {
            enrollment.setStatus(dto.getStatus());
        }

        if (dto.getProgressPercentage() != null) {

            int progress = dto.getProgressPercentage();

            if (progress < 0 || progress > 100) {
                throw new BusinessValidationException(
                        "Progress must be between 0 and 100"
                );
            }

            enrollment.setProgressPercentage(progress);

            if (progress == 100) {
                enrollment.setStatus("COMPLETED");
            }
        }

        return mapToDto(
                repository.save(enrollment)
        );
    }

    @Transactional
    public void deleteEnrollment(Long id) {

        RoadmapEnrollment enrollment = findById(id);

        repository.delete(enrollment);
    }

    @Transactional
    public void dropEnrollment(Long id) {

        RoadmapEnrollment enrollment = findById(id);

        /*
         * Student can drop only their own enrollment.
         */
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            if (!enrollment.getStudent()
                    .getId()
                    .equals(student.getId())) {

                throw new BusinessValidationException(
                        "You can only drop your own enrollment"
                );
            }
        }

        if ("COMPLETED".equals(enrollment.getStatus())) {

            throw new BusinessValidationException(
                    "Completed enrollment cannot be dropped"
            );
        }

        enrollment.setStatus("DROPPED");

        repository.save(enrollment);
    }

    /*
     * Find currently logged-in student's account
     * using the email stored in the JWT authentication.
     */
    private SprintAccount getCurrentStudent() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return accountRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student account not found"
                        ));
    }

    /*
     * Check whether the current user has STUDENT role.
     */
    private boolean isStudent(
            Authentication authentication) {

        if (authentication == null
                || authentication.getAuthorities() == null) {

            return false;
        }

        return authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        "ROLE_STUDENT".equals(
                                authority.getAuthority()
                        )
                        ||
                        "STUDENT".equals(
                                authority.getAuthority()
                        )
                );
    }

    private RoadmapEnrollment findById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Enrollment not found"
                        ));
    }

    private EnrollmentResponseDto mapToDto(
            RoadmapEnrollment entity) {

        EnrollmentResponseDto dto =
                new EnrollmentResponseDto();

        dto.setId(entity.getId());
        dto.setStudentId(
                entity.getStudent().getId()
        );
        dto.setRoadmapId(
                entity.getRoadmap().getId()
        );
        dto.setStatus(
                entity.getStatus()
        );
        dto.setProgressPercentage(
                entity.getProgressPercentage()
        );
        dto.setEnrolledAt(
                entity.getEnrolledAt()
        );

        return dto;
    }
}