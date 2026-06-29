// package com.example.demo.service;

// import org.springframework.data.domain.Pageable;

// import com.example.demo.dto.MilestoneRequestDto;
// import com.example.demo.dto.MilestoneResponseDto;
// import com.example.demo.dto.PageResponseDto;

// public interface MilestoneService {

//     PageResponseDto<MilestoneResponseDto> getMilestonesByRoadmap(Long roadmapId, Pageable pageable);

//     MilestoneResponseDto getMilestoneById(Long id);

//     MilestoneResponseDto createMilestone(MilestoneRequestDto dto);

//     MilestoneResponseDto updateMilestone(Long id, MilestoneRequestDto dto);

//     void deleteMilestone(Long id);

// }