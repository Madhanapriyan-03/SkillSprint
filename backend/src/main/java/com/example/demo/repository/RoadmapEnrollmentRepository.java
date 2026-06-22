package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.RoadmapEnrollment;

@Repository
public interface RoadmapEnrollmentRepository
        extends JpaRepository<RoadmapEnrollment, Long> {

    void deleteAllByRoadmapId(Long roadmapId);
}