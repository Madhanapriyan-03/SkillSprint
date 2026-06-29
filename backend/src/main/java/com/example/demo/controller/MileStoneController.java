// package com.example.demo.controller;

// import com.example.demo.dto.MilestoneRequestDto;
// import com.example.demo.dto.MilestoneResponseDto;
// import com.example.demo.dto.PageResponseDto;
// import com.example.demo.service.MilestoneService;
// import jakarta.validation.Valid;
// import org.springframework.data.domain.Pageable;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/milestones")
// public class MilestoneController {

//     private final MilestoneService milestoneService;

//     public MilestoneController(MilestoneService milestoneService) {
//         this.milestoneService = milestoneService;
//     }

//     @GetMapping
//     public ResponseEntity<PageResponseDto<MilestoneResponseDto>> getByRoadmap(
//             @RequestParam Long roadmapId,
//             Pageable pageable) {

//         return ResponseEntity.ok(
//                 milestoneService.getMilestonesByRoadmap(roadmapId, pageable));
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<MilestoneResponseDto> getById(@PathVariable Long id) {
//         return ResponseEntity.ok(milestoneService.getMilestoneById(id));
//     }

//     @PostMapping
//     @ResponseStatus(HttpStatus.CREATED)
//     public ResponseEntity<MilestoneResponseDto> create(
//             @Valid @RequestBody MilestoneRequestDto dto) {

//         return new ResponseEntity<>(
//                 milestoneService.createMilestone(dto),
//                 HttpStatus.CREATED);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<MilestoneResponseDto> update(
//             @PathVariable Long id,
//             @Valid @RequestBody MilestoneRequestDto dto) {

//         return ResponseEntity.ok(
//                 milestoneService.updateMilestone(id, dto));
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<String> delete(@PathVariable Long id) {

//         milestoneService.deleteMilestone(id);

//         return ResponseEntity.ok("Milestone deleted successfully.");
//     }
// }