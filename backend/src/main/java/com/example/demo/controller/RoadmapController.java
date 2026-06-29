package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.LearningRoadmap;
import com.example.demo.service.RoadmapService;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {

    @Autowired
    private RoadmapService ser;

    @PostMapping("/create")
    public LearningRoadmap createRoadmap(@RequestBody LearningRoadmap roadmap) {
        return ser.createRoadmap(roadmap);
    }

    @GetMapping("/fetch")
    public List<LearningRoadmap> fetchRoadmaps() {
        return ser.getAllRoadmaps();
    }

    @GetMapping("/fetchid/{id}")
    public Optional<LearningRoadmap> fetchRoadmapById(@PathVariable Long id) {
        return ser.getRoadmapById(id);
    }

}