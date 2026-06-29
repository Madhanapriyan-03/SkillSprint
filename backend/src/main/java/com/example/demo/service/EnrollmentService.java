// package com.example.demo.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.stereotype.Service;

// import com.example.demo.dto.EnrollmentRequestDto;
// import com.example.demo.dto.EnrollmentResponseDto;
// import com.example.demo.dto.PageResponseDto;
// import com.example.demo.entity.LearningRoadmap;
// import com.example.demo.entity.RoadmapEnrollment;
// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.repository.LearningRoadmapRepository;
// import com.example.demo.repository.RoadmapEnrollmentRepository;

// @Service
// public class EnrollmentService {

//     @Autowired
//     private RoadmapEnrollmentRepository enrollmentRepository;

//     @Autowired
//     private LearningRoadmapRepository roadmapRepository;

//     public PageResponseDto<EnrollmentResponseDto> getAllEnrollments(Pageable pageable) {

//         Page<RoadmapEnrollment> page = enrollmentRepository.findAll(pageable);

//         PageResponseDto<EnrollmentResponseDto> response = new PageResponseDto<>();

//         response.setContent(page.map(this::convertToDto).getContent());
//         response.setCurrentPage(page.getNumber());
//         response.setTotalElements(page.getTotalElements());
//         response.setTotalPages(page.getTotalPages());

//         return response;
//     }

//     public EnrollmentResponseDto getEnrollmentById(Long id) {

//         RoadmapEnrollment enrollment = enrollmentRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));

//         return convertToDto(enrollment);
//     }

//     public EnrollmentResponseDto createEnrollment(EnrollmentRequestDto dto) {

//         RoadmapEnrollment enrollment = new RoadmapEnrollment();

//         enrollment.setStudentId(dto.getStudentId());
//         enrollment.setRoadmapId(dto.getRoadmapId());
//         enrollment.setStatus("ACTIVE");
//         enrollment.setProgressPercentage(0);

//         enrollment = enrollmentRepository.save(enrollment);

//         return convertToDto(enrollment);
//     }

//     public EnrollmentResponseDto updateEnrollment(Long id,
//                                                   EnrollmentRequestDto dto) {

//         RoadmapEnrollment enrollment = enrollmentRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));

//         enrollment.setStudentId(dto.getStudentId());
//         enrollment.setRoadmapId(dto.getRoadmapId());

//         enrollment = enrollmentRepository.save(enrollment);

//         return convertToDto(enrollment);
//     }

//     public void deleteEnrollment(Long id) {

//         enrollmentRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));

//         enrollmentRepository.deleteById(id);
//     }

//     public EnrollmentResponseDto dropEnrollment(Long id) {

//         RoadmapEnrollment enrollment = enrollmentRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));

//         enrollment.setStatus("DROPPED");

//         enrollment = enrollmentRepository.save(enrollment);

//         return convertToDto(enrollment);
//     }

//     private EnrollmentResponseDto convertToDto(RoadmapEnrollment enrollment) {

//         EnrollmentResponseDto dto = new EnrollmentResponseDto();

//         dto.setId(enrollment.getId());
//         dto.setStudentId(enrollment.getStudentId());
//         dto.setRoadmapId(enrollment.getRoadmapId());
//         dto.setStatus(enrollment.getStatus());
//         dto.setProgressPercentage(enrollment.getProgressPercentage());
//         dto.setEnrolledAt(enrollment.getEnrolledAt());

//         roadmapRepository.findById(enrollment.getRoadmapId())
//                 .ifPresent(roadmap -> dto.setRoadmapTitle(roadmap.getTitle()));

//         return dto;
//     }
// }