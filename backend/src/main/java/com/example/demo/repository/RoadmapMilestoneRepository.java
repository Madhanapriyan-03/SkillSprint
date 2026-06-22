package com.example.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.RoadmapMilestone;

@Repository
public interface RoadmapMilestoneRepository
        extends JpaRepository<RoadmapMilestone, Long> {

    Page<RoadmapMilestone> findByRoadmapId(
            Long roadmapId,
            Pageable pageable);

    void deleteAllByRoadmapId(Long roadmapId);
}