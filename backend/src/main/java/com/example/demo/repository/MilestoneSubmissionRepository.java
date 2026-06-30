package com.example.demo.repository;

import com.example.demo.entity.MilestoneSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MilestoneSubmissionRepository extends JpaRepository<MilestoneSubmission, Long> {

    Page<MilestoneSubmission> findByEnrollmentId(Long enrollmentId, Pageable pageable);

    Page<MilestoneSubmission> findByMilestone_Roadmap_MentorIdAndStatus(
            Long mentorId,
            String status,
            Pageable pageable
    );

    long countByEnrollmentIdAndStatus(Long enrollmentId, String status);

    boolean existsByEnrollmentIdAndMilestoneIdAndStatus(
            Long enrollmentId,
            Long milestoneId,
            String status
    );

    @Modifying
    @Transactional
    @Query("DELETE FROM MilestoneSubmission s WHERE s.enrollment.roadmap.id = :roadmapId")
    void deleteAllByRoadmapId(@Param("roadmapId") Long roadmapId);
}