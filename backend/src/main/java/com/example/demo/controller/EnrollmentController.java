// package com.example.demo.controller;

// import com.example.demo.dto.EnrollmentRequestDto;
// import com.example.demo.dto.EnrollmentResponseDto;
// import com.example.demo.dto.PageResponseDto;
// import com.example.demo.service.EnrollmentService;
// import jakarta.validation.Valid;
// import org.springframework.data.domain.Pageable;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/enrollments")
// public class EnrollmentController {

//     private final EnrollmentService enrollmentService;

//     public EnrollmentController(EnrollmentService enrollmentService) {
//         this.enrollmentService = enrollmentService;
//     }

//     @GetMapping
//     public ResponseEntity<PageResponseDto<EnrollmentResponseDto>> getAll(Pageable pageable) {
//         return ResponseEntity.ok(enrollmentService.getAllEnrollments(pageable));
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<EnrollmentResponseDto> getById(@PathVariable Long id) {
//         return ResponseEntity.ok(enrollmentService.getEnrollmentById(id));
//     }

//     @PostMapping
//     @ResponseStatus(HttpStatus.CREATED)
//     public EnrollmentResponseDto create(@Valid @RequestBody EnrollmentRequestDto dto) {
//         return enrollmentService.createEnrollment(dto);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<EnrollmentResponseDto> update(@PathVariable Long id,
//             @Valid @RequestBody EnrollmentRequestDto dto) {

//         return ResponseEntity.ok(enrollmentService.updateEnrollment(id, dto));
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<String> delete(@PathVariable Long id) {
//         enrollmentService.deleteEnrollment(id);
//         return ResponseEntity.ok("Enrollment deleted successfully.");
//     }

//     @PutMapping("/{id}/drop")
//     public ResponseEntity<EnrollmentResponseDto> drop(@PathVariable Long id) {
//         return ResponseEntity.ok(enrollmentService.dropEnrollment(id));
//     }
// }