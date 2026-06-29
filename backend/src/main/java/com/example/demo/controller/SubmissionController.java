// package com.example.demo.controller;

// import com.example.demo.dto.GradeRequestDto;
// import com.example.demo.dto.PageResponseDto;
// import com.example.demo.dto.SubmissionRequestDto;
// import com.example.demo.dto.SubmissionResponseDto;
// import com.example.demo.service.SubmissionService;
// import jakarta.validation.Valid;
// import org.springframework.data.domain.Pageable;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/submissions")
// public class SubmissionController {

//     private final SubmissionService submissionService;

//     public SubmissionController(SubmissionService submissionService) {
//         this.submissionService = submissionService;
//     }

//     @GetMapping
//     public ResponseEntity<PageResponseDto<SubmissionResponseDto>> getAll(Pageable pageable) {
//         return ResponseEntity.ok(submissionService.getAllSubmissions(pageable));
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<SubmissionResponseDto> getById(@PathVariable Long id) {
//         return ResponseEntity.ok(submissionService.getSubmissionById(id));
//     }

//     @PostMapping
//     @ResponseStatus(HttpStatus.CREATED)
//     public ResponseEntity<SubmissionResponseDto> create(
//             @Valid @RequestBody SubmissionRequestDto dto) {

//         return new ResponseEntity<>(
//                 submissionService.createSubmission(dto),
//                 HttpStatus.CREATED);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<SubmissionResponseDto> update(
//             @PathVariable Long id,
//             @Valid @RequestBody SubmissionRequestDto dto) {

//         return ResponseEntity.ok(
//                 submissionService.updateSubmission(id, dto));
//     }

//     @DeleteMapping("/{id}")
//     @ResponseStatus(HttpStatus.NO_CONTENT)
//     public void delete(@PathVariable Long id) {
//         submissionService.deleteSubmission(id);
//     }

//     @PutMapping("/{id}/grade")
//     public ResponseEntity<SubmissionResponseDto> grade(
//             @PathVariable Long id,
//             @Valid @RequestBody GradeRequestDto dto) {

//         return ResponseEntity.ok(
//                 submissionService.gradeSubmission(id, dto));
//     }
// }