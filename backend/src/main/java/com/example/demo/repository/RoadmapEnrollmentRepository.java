package com.example.demo.repository;

import com.example.demo.entity.RoadmapEnrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface RoadmapEnrollmentRepository extends JpaRepository<RoadmapEnrollment, Long> {

    Page<RoadmapEnrollment> findByStudentId(Long studentId, Pageable pageable);

    long countByRoadmapIdAndStatusIn(Long roadmapId, List<String> statuses);

    Optional<RoadmapEnrollment> findByStudentIdAndRoadmapId(Long studentId, Long roadmapId);

    long countByRoadmapId(Long roadmapId);

    @Modifying
    @Transactional
    @Query("DELETE FROM RoadmapEnrollment re WHERE re.roadmap.id = :roadmapId")
    void deleteAllByRoadmapId(@Param("roadmapId") Long roadmapId);
}