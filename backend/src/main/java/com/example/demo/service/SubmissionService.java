package com.example.demo.service;

import com.example.demo.dto.GradeRequestDto;
import com.example.demo.dto.PageResponseDto;
import com.example.demo.dto.SubmissionRequestDto;
import com.example.demo.dto.SubmissionResponseDto;
import com.example.demo.entity.MilestoneSubmission;
import com.example.demo.entity.RoadmapEnrollment;
import com.example.demo.entity.RoadmapMilestone;
import com.example.demo.entity.SprintAccount;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.MilestoneSubmissionRepository;
import com.example.demo.repository.RoadmapEnrollmentRepository;
import com.example.demo.repository.RoadmapMilestoneRepository;
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
public class SubmissionService {

    private final MilestoneSubmissionRepository repository;
    private final RoadmapEnrollmentRepository enrollmentRepository;
    private final RoadmapMilestoneRepository milestoneRepository;
    private final SprintAccountRepository accountRepository;

    public SubmissionService(
            MilestoneSubmissionRepository repository,
            RoadmapEnrollmentRepository enrollmentRepository,
            RoadmapMilestoneRepository milestoneRepository,
            SprintAccountRepository accountRepository) {

        this.repository = repository;
        this.enrollmentRepository = enrollmentRepository;
        this.milestoneRepository = milestoneRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional(readOnly = true)
    public PageResponseDto<SubmissionResponseDto> getAllSubmissions(Pageable pageable) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Page<MilestoneSubmission> page;

        /*
         * STUDENT:
         * Show only submissions belonging to the currently
         * logged-in student's enrollments.
         *
         * MENTOR / LEARNING_MANAGER:
         * Keep existing behavior and show all submissions.
         */
        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            page = repository.findByEnrollment_Student_Id(
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

    public SubmissionResponseDto getSubmissionById(Long id) {
        return mapToDto(findById(id));
    }

    @Transactional
    public SubmissionResponseDto createSubmission(SubmissionRequestDto dto) {

        RoadmapEnrollment enrollment =
                enrollmentRepository.findById(dto.getEnrollmentId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Enrollment not found"));

        /*
         * If the logged-in user is a STUDENT,
         * make sure the enrollment belongs to that student.
         *
         * LEARNING_MANAGER can continue to create submissions
         * according to the existing role permissions.
         */
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            if (!enrollment.getStudent().getId().equals(student.getId())) {
                throw new BusinessValidationException(
                        "You can only submit for your own enrollment"
                );
            }
        }

        if ("COMPLETED".equals(enrollment.getStatus())
                || "DROPPED".equals(enrollment.getStatus())) {

            throw new BusinessValidationException(
                    "Cannot submit to an inactive enrollment"
            );
        }

        if (repository.existsByEnrollmentIdAndMilestoneIdAndStatus(
                enrollment.getId(),
                dto.getMilestoneId(),
                "PASSED")) {

            throw new BusinessValidationException(
                    "Milestone already passed"
            );
        }

        RoadmapMilestone milestone =
                milestoneRepository.findById(dto.getMilestoneId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Milestone not found"));

        if (!milestone.getRoadmap().getId()
                .equals(enrollment.getRoadmap().getId())) {

            throw new BusinessValidationException(
                    "Milestone does not belong to the enrolled roadmap"
            );
        }

        MilestoneSubmission submission =
                new MilestoneSubmission();

        submission.setEnrollment(enrollment);
        submission.setMilestone(milestone);
        submission.setContentUrl(dto.getContentUrl());
        submission.setStatus("PENDING");
        submission.setSubmittedAt(LocalDateTime.now());

        return mapToDto(repository.save(submission));
    }

    public SubmissionResponseDto updateSubmission(
            Long id,
            SubmissionRequestDto dto) {

        MilestoneSubmission submission = findById(id);

        /*
         * STUDENT can update only their own submission.
         *
         * Controller already protects this as well,
         * but keeping the ownership check here makes the
         * service layer safer.
         */
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            if (!submission.getEnrollment()
                    .getStudent()
                    .getId()
                    .equals(student.getId())) {

                throw new BusinessValidationException(
                        "You can only update your own submission"
                );
            }
        }

        if (!"PENDING".equals(submission.getStatus())
                && !"REJECTED".equals(submission.getStatus())) {

            throw new BusinessValidationException(
                    "Cannot update a passed submission"
            );
        }

        submission.setContentUrl(dto.getContentUrl());

        return mapToDto(repository.save(submission));
    }

    public void deleteSubmission(Long id) {

        MilestoneSubmission submission = findById(id);

        /*
         * STUDENT can delete only their own submission.
         */
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (isStudent(authentication)) {

            SprintAccount student = getCurrentStudent();

            if (!submission.getEnrollment()
                    .getStudent()
                    .getId()
                    .equals(student.getId())) {

                throw new BusinessValidationException(
                        "You can only delete your own submission"
                );
            }
        }

        if ("PASSED".equals(submission.getStatus())) {

            throw new BusinessValidationException(
                    "Cannot delete a passed submission"
            );
        }

        repository.delete(submission);
    }

    @Transactional
    public SubmissionResponseDto gradeSubmission(
            Long id,
            GradeRequestDto dto) {

        MilestoneSubmission submission = findById(id);

        if ("PASSED".equals(submission.getStatus())) {

            throw new BusinessValidationException(
                    "Submission already passed"
            );
        }

        boolean passed =
                dto.getScore() >=
                submission.getMilestone().getPassingScore();

        submission.setScore(dto.getScore());
        submission.setStatus(
                passed ? "PASSED" : "REJECTED"
        );

        MilestoneSubmission saved =
                repository.save(submission);

        if (passed) {

            RoadmapEnrollment enrollment =
                    submission.getEnrollment();

            long totalMilestones =
                    milestoneRepository.countByRoadmapId(
                            enrollment.getRoadmap().getId()
                    );

            long passedMilestones =
                    repository.countByEnrollmentIdAndStatus(
                            enrollment.getId(),
                            "PASSED"
                    );

            int newProgress =
                    (int) ((passedMilestones * 100) / totalMilestones);

            enrollment.setProgressPercentage(newProgress);

            if (newProgress == 100) {
                enrollment.setStatus("COMPLETED");
            }

            enrollmentRepository.save(enrollment);
        }

        return mapToDto(saved);
    }

    /*
     * Get the currently logged-in student's account.
     *
     * JWT authentication stores the user's email as
     * the authentication name.
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
     * Check whether the current user is a STUDENT.
     *
     * Mentor and Learning Manager should retain
     * their existing access to submissions.
     */
    private boolean isStudent(Authentication authentication) {

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

    private MilestoneSubmission findById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Submission not found"
                        ));
    }

    private SubmissionResponseDto mapToDto(
            MilestoneSubmission entity) {

        SubmissionResponseDto dto =
                new SubmissionResponseDto();

        dto.setId(entity.getId());
        dto.setEnrollmentId(
                entity.getEnrollment().getId()
        );
        dto.setMilestoneId(
                entity.getMilestone().getId()
        );
        dto.setContentUrl(
                entity.getContentUrl()
        );
        dto.setScore(
                entity.getScore()
        );
        dto.setStatus(
                entity.getStatus()
        );
        dto.setSubmittedAt(
                entity.getSubmittedAt()
        );

        return dto;
    }
}