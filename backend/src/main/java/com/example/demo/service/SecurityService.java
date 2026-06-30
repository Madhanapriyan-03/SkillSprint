package com.example.demo.service;

import com.example.demo.entity.MilestoneSubmission;
import com.example.demo.entity.RoadmapEnrollment;
import com.example.demo.repository.MilestoneSubmissionRepository;
import com.example.demo.repository.RoadmapEnrollmentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service("securityService")
public class SecurityService {

    private final RoadmapEnrollmentRepository enrollmentRepository;
    private final MilestoneSubmissionRepository submissionRepository;

    public SecurityService(
            RoadmapEnrollmentRepository enrollmentRepository,
            MilestoneSubmissionRepository submissionRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.submissionRepository = submissionRepository;
    }

    public boolean isEnrollmentOwner(Authentication authentication, Long enrollmentId) {
        return enrollmentRepository.findById(enrollmentId)
                .map(RoadmapEnrollment::getStudent)
                .map(student -> student.getEmail().equals(authentication.getName()))
                .orElse(false);
    }

    public boolean isSubmissionOwner(Authentication authentication, Long submissionId) {
        return submissionRepository.findById(submissionId)
                .map(MilestoneSubmission::getEnrollment)
                .map(RoadmapEnrollment::getStudent)
                .map(student -> student.getEmail().equals(authentication.getName()))
                .orElse(false);
    }
}