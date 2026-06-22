package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.MilestoneSubmission;

@Repository
public interface MilestoneSubmissionRepository
        extends JpaRepository<MilestoneSubmission, Long> {

    void deleteAllByRoadmapId(Long roadmapId);
}