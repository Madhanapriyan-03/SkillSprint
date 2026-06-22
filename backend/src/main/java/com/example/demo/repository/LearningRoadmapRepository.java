package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.LearningRoadmap;

@Repository
public interface LearningRoadmapRepository
        extends JpaRepository<LearningRoadmap, Long> {

}