package com.example.demo.repository;

import com.example.demo.entity.LearningRoadmap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningRoadmapRepository extends JpaRepository<LearningRoadmap, Long> {

    Page<LearningRoadmap> findByStatus(String status, Pageable pageable);

    Page<LearningRoadmap> findByMentorId(Long mentorId, Pageable pageable);
}