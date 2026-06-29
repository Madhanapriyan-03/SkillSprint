package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.LearningRoadmap;
import com.example.demo.repository.LearningRoadmapRepository;

@Service
public class RoadmapService {

    @Autowired
    private LearningRoadmapRepository repo;

    public LearningRoadmap createRoadmap(LearningRoadmap roadmap) {
        return repo.save(roadmap);
    }

    public List<LearningRoadmap> getAllRoadmaps() {
        return repo.findAll();
    }

    public Optional<LearningRoadmap> getRoadmapById(Long id) {
        return repo.findById(id);
    }

}