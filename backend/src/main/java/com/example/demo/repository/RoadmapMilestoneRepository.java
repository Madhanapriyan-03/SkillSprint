package com.example.demo.repository;

import com.example.demo.entity.RoadmapMilestone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface RoadmapMilestoneRepository extends JpaRepository<RoadmapMilestone, Long> {
    Page<RoadmapMilestone> findByRoadmapId(Long roadmapId, Pageable pageable);
    long countByRoadmapId(Long roadmapId);

    @Modifying
    @Transactional
    @Query("DELETE FROM RoadmapMilestone rm WHERE rm.roadmap.id = :roadmapId")
    void deleteAllByRoadmapId(@Param("roadmapId") Long roadmapId);
}