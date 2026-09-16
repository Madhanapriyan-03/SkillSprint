package com.example.demo;

import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.*;
import java.lang.reflect.*;
import java.util.*;

@Listeners(TestResultListener.class)
public class ProjectValidationTests {

    // =====================================================================================
    // CATEGORY 1: Folder Structure & Package Verification (5 Tests)
    // =====================================================================================
    @Test
    public void t01_folderAuthController() throws Exception {
        java.io.File file = new java.io.File("src/main/java/com/example/demo/controller/AuthController.java");
        Assert.assertTrue(file.exists() && file.isFile(),
                "AuthController.java should exist at " + file.getAbsolutePath());
        Assert.assertNotNull(Class.forName("com.example.demo.controller.AuthController"));
    }

    @Test
    public void t02_folderRoadmapService() throws Exception {
        java.io.File file = new java.io.File("src/main/java/com/example/demo/service/RoadmapService.java");
        Assert.assertTrue(file.exists() && file.isFile(),
                "RoadmapService.java should exist at " + file.getAbsolutePath());
        Assert.assertNotNull(Class.forName("com.example.demo.service.RoadmapService"));
    }

    @Test
    public void t03_folderSprintAccountRepository() throws Exception {
        java.io.File file = new java.io.File("src/main/java/com/example/demo/repository/SprintAccountRepository.java");
        Assert.assertTrue(file.exists() && file.isFile(),
                "SprintAccountRepository.java should exist at " + file.getAbsolutePath());
        Assert.assertNotNull(Class.forName("com.example.demo.repository.SprintAccountRepository"));
    }

    @Test
    public void t04_folderLearningRoadmapEntity() throws Exception {
        java.io.File file = new java.io.File("src/main/java/com/example/demo/entity/LearningRoadmap.java");
        Assert.assertTrue(file.exists() && file.isFile(),
                "LearningRoadmap.java should exist at " + file.getAbsolutePath());
        Assert.assertNotNull(Class.forName("com.example.demo.entity.LearningRoadmap"));
    }

    @Test
    public void t05_folderSecurityJwt() throws Exception {
        java.io.File file = new java.io.File("src/main/java/com/example/demo/security/JwtUtil.java");
        Assert.assertTrue(file.exists() && file.isFile(), "JwtUtil.java should exist at " + file.getAbsolutePath());
        Assert.assertNotNull(Class.forName("com.example.demo.security.JwtUtil"));
    }

    // =====================================================================================
    // CATEGORY 2: The Unified Logic Stack (13 Tests) - Path + Status + Body
    // =====================================================================================
    @Test
    public void t06_authLoginLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.AuthController");
        Class<?> reqDtoClazz = Class.forName("com.example.demo.dto.AuthRequestDto");
        Class<?> respDtoClazz = Class.forName("com.example.demo.dto.AuthResponseDto");
        Method m = clazz.getDeclaredMethod("login", reqDtoClazz);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0]
                + ((PostMapping) m.getAnnotation(PostMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/auth/login");
        Assert.assertEquals(m.getReturnType(), respDtoClazz);
    }

    @Test
    public void t07_authRegisterLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.AuthController");
        Class<?> reqDtoClazz = Class.forName("com.example.demo.dto.AuthRequestDto");
        Method m = clazz.getDeclaredMethod("register", reqDtoClazz);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0]
                + ((PostMapping) m.getAnnotation(PostMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/auth/register");
        Assert.assertTrue(m.isAnnotationPresent(ResponseStatus.class));
    }

    @Test
    public void t08_roadmapUpdateLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.RoadmapController");
        Class<?> reqDtoClazz = Class.forName("com.example.demo.dto.RoadmapRequestDto");
        Method m = clazz.getDeclaredMethod("update", Long.class, reqDtoClazz);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0]
                + ((PutMapping) m.getAnnotation(PutMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/roadmaps/{id}");
        Assert.assertTrue(m.isAnnotationPresent(PutMapping.class));
    }

    @Test
    public void t09_roadmapListLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.RoadmapController");
        Method m = clazz.getDeclaredMethod("getAll", Pageable.class);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/roadmaps");
        Assert.assertTrue(m.getReturnType().getSimpleName().contains("PageResponseDto"));
    }

    @Test
    public void t10_enrollmentListLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.EnrollmentController");
        Method m = clazz.getDeclaredMethod("getAll", Pageable.class);
        Assert.assertEquals(((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0], "/api/enrollments");
        Assert.assertTrue(m.getReturnType().getSimpleName().contains("PageResponseDto"));
    }

    @Test
    public void t11_roadmapCreateLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.RoadmapController");
        Class<?> serviceClazz = Class.forName("com.example.demo.service.RoadmapService");
        Class<?> reqDtoClazz = Class.forName("com.example.demo.dto.RoadmapRequestDto");
        Class<?> respDtoClazz = Class.forName("com.example.demo.dto.RoadmapResponseDto");
        
        Method m = clazz.getDeclaredMethod("create", reqDtoClazz);
        Assert.assertTrue(m.isAnnotationPresent(PostMapping.class));
        
        // Mock service using Mockito
        Object mockService = org.mockito.Mockito.mock(serviceClazz);
        Object dummyResponse = respDtoClazz.getDeclaredConstructor().newInstance();
        Method setTitleMethod = respDtoClazz.getMethod("setTitle", String.class);
        setTitleMethod.invoke(dummyResponse, "Logic Verified");
        
        Method createRoadmapMethod = serviceClazz.getMethod("createRoadmap", reqDtoClazz);
        Object dummyDto = org.mockito.Mockito.any(reqDtoClazz);
        org.mockito.Mockito.when(createRoadmapMethod.invoke(mockService, dummyDto)).thenReturn(dummyResponse);
        
        Object controller = clazz.getDeclaredConstructor(serviceClazz).newInstance(mockService);
        Object result = m.invoke(controller, reqDtoClazz.getDeclaredConstructor().newInstance());
        
        Method getTitleMethod = respDtoClazz.getMethod("getTitle");
        String title = (String) getTitleMethod.invoke(result);
        Assert.assertEquals(title, "Logic Verified");
    }

    @Test
    public void t12_roadmapDeleteLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.RoadmapController");
        Class<?> serviceClazz = Class.forName("com.example.demo.service.RoadmapService");
        Method m = clazz.getDeclaredMethod("delete", Long.class);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0]
                + ((DeleteMapping) m.getAnnotation(DeleteMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/roadmaps/{id}");
        
        Object mockService = org.mockito.Mockito.mock(serviceClazz);
        Object controller = clazz.getDeclaredConstructor(serviceClazz).newInstance(mockService);
        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, 1L);
        Assert.assertEquals(resp.getBody(), "Roadmap deleted successfully.");
    }

    @Test
    public void t13_enrollmentCreateLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.EnrollmentController");
        Class<?> reqDtoClazz = Class.forName("com.example.demo.dto.EnrollmentRequestDto");
        Class<?> respDtoClazz = Class.forName("com.example.demo.dto.EnrollmentResponseDto");
        Method m = clazz.getDeclaredMethod("create", reqDtoClazz);
        Assert.assertTrue(m.isAnnotationPresent(PostMapping.class));
        Assert.assertEquals(m.getReturnType(), respDtoClazz);
    }

    @Test
    public void t14_enrollmentDeleteLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.EnrollmentController");
        Class<?> serviceClazz = Class.forName("com.example.demo.service.EnrollmentService");
        Method m = clazz.getDeclaredMethod("delete", Long.class);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0]
                + ((DeleteMapping) m.getAnnotation(DeleteMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/enrollments/{id}");
        
        Object mockService = org.mockito.Mockito.mock(serviceClazz);
        Object controller = clazz.getDeclaredConstructor(serviceClazz).newInstance(mockService);
        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, 1L);
        Assert.assertEquals(resp.getBody(), "Enrollment deleted successfully.");
    }

    @Test
    public void t15_milestoneListLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.MilestoneController");
        Method m = clazz.getDeclaredMethod("getByRoadmap", Long.class, Pageable.class);
        Assert.assertEquals(((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0], "/api/milestones");
        Assert.assertTrue(m.isAnnotationPresent(GetMapping.class));
    }

    @Test
    public void t16_milestoneCreateLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.MilestoneController");
        Class<?> reqDtoClazz = Class.forName("com.example.demo.dto.MilestoneRequestDto");
        Class<?> respDtoClazz = Class.forName("com.example.demo.dto.MilestoneResponseDto");
        Method m = clazz.getDeclaredMethod("create", reqDtoClazz);
        Assert.assertTrue(m.isAnnotationPresent(PostMapping.class));
        Assert.assertEquals(m.getReturnType(), respDtoClazz);
    }

    @Test
    public void t17_milestoneDeleteLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.MilestoneController");
        Class<?> serviceClazz = Class.forName("com.example.demo.service.MilestoneService");
        Method m = clazz.getDeclaredMethod("delete", Long.class);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0]
                + ((DeleteMapping) m.getAnnotation(DeleteMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/milestones/{id}");
        
        Object mockService = org.mockito.Mockito.mock(serviceClazz);
        Object controller = clazz.getDeclaredConstructor(serviceClazz).newInstance(mockService);
        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, 1L);
        Assert.assertEquals(resp.getBody(), "Milestone deleted successfully.");
    }

    @Test
    public void t18_getRoadmapByIdLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.controller.RoadmapController");
        Class<?> respDtoClazz = Class.forName("com.example.demo.dto.RoadmapResponseDto");
        Method m = clazz.getDeclaredMethod("getById", Long.class);
        String path = ((RequestMapping) clazz.getAnnotation(RequestMapping.class)).value()[0]
                + ((GetMapping) m.getAnnotation(GetMapping.class)).value()[0];
        Assert.assertEquals(path, "/api/roadmaps/{id}");
        Assert.assertEquals(m.getReturnType(), respDtoClazz);
    }

    // =====================================================================================
    // CATEGORY 3: Repository Logic (2 Tests)
    // =====================================================================================
    @Test
    public void t19_repositoryInheritanceLogic() throws Exception {
        Assert.assertTrue(org.springframework.data.jpa.repository.JpaRepository.class
                .isAssignableFrom(Class.forName("com.example.demo.repository.SprintAccountRepository")));
    }

    @Test
    public void t20_repositoryCustomLogic() throws Exception {
        Method m = Class.forName("com.example.demo.repository.SprintAccountRepository")
                .getDeclaredMethod("findByEmail", String.class);
        Assert.assertEquals(m.getReturnType(), Optional.class);
    }

    // =====================================================================================
    // CATEGORY 4: Exception logic (3 Tests)
    // =====================================================================================
    @Test
    public void t21_exceptionHandlerAdviceLogic() throws Exception {
        Assert.assertTrue(Class.forName("com.example.demo.exception.GlobalExceptionHandler")
                .isAnnotationPresent(ControllerAdvice.class));
    }

    @Test
    @SuppressWarnings("unchecked")
    public void t22_resourceNotFoundLogic() throws Exception {
        Class<?> handlerClass = Class.forName("com.example.demo.exception.GlobalExceptionHandler");
        Class<?> exClass = Class.forName("com.example.demo.exception.ResourceNotFoundException");
        Method m = handlerClass.getDeclaredMethod("handleResourceNotFound", exClass);
        Object handler = handlerClass.getDeclaredConstructor().newInstance();
        Object exception = exClass.getDeclaredConstructor(String.class).newInstance("Entity missing");
        ResponseEntity<Map<String, String>> resp = (ResponseEntity<Map<String, String>>) m.invoke(handler, exception);
        Assert.assertEquals(resp.getBody().get("message"), "Entity missing");
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.NOT_FOUND);
    }

    @Test
    @SuppressWarnings("unchecked")
    public void t23_businessValidationLogic() throws Exception {
        Class<?> handlerClass = Class.forName("com.example.demo.exception.GlobalExceptionHandler");
        Class<?> exClass = Class.forName("com.example.demo.exception.BusinessValidationException");
        Method m = handlerClass.getDeclaredMethod("handleBusinessValidation", exClass);
        Object handler = handlerClass.getDeclaredConstructor().newInstance();
        Object exception = exClass.getDeclaredConstructor(String.class).newInstance("Domain rule broken");
        ResponseEntity<Map<String, String>> resp = (ResponseEntity<Map<String, String>>) m.invoke(handler, exception);
        Assert.assertEquals(resp.getBody().get("message"), "Domain rule broken");
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.BAD_REQUEST);
    }

    // =====================================================================================
    // CATEGORY 5: JWT Logic (3 Tests)
    // =====================================================================================
    @Test
    public void t24_jwtGenerateLogic() throws Exception {
        Method m = Class.forName("com.example.demo.security.JwtUtil")
                .getDeclaredMethod("generateToken", Map.class,
                        org.springframework.security.core.userdetails.UserDetails.class);
        Assert.assertEquals(m.getReturnType(), String.class);
    }

    @Test
    public void t25_jwtValidateLogic() throws Exception {
        Method m = Class.forName("com.example.demo.security.JwtUtil")
                .getDeclaredMethod("isTokenValid", String.class,
                        org.springframework.security.core.userdetails.UserDetails.class);
        Assert.assertEquals(m.getReturnType(), boolean.class);
    }

    @Test
    public void t26_jwtSecretLogic() throws Exception {
        Class<?> clazz = Class.forName("com.example.demo.security.JwtUtil");
        Field f = Arrays.stream(clazz.getDeclaredFields())
                .filter(field -> field.getName().toLowerCase().contains("secret")).findFirst().orElse(null);
        Assert.assertNotNull(f);
    }

    // =====================================================================================
    // CATEGORY 6: Entity Mapping Logic (2 Tests)
    // =====================================================================================
    @Test
    public void t27_entitySprintAccountLogic() throws Exception {
        jakarta.persistence.Table table = Class.forName("com.example.demo.entity.SprintAccount")
                .getAnnotation(jakarta.persistence.Table.class);
        Assert.assertNotNull(table.name());
        Assert.assertFalse(table.name().isEmpty());
    }

    @Test
    public void t28_entityLearningRoadmapLogic() throws Exception {
        jakarta.persistence.Table table = Class.forName("com.example.demo.entity.LearningRoadmap")
                .getAnnotation(jakarta.persistence.Table.class);
        Assert.assertNotNull(table.name());
        Assert.assertTrue(table.name().contains("roadmap"));
    }

    // =====================================================================================
    // CATEGORY 7: Security Config Logic (2 Tests)
    // =====================================================================================
    @Test
    public void t29_securityEncoderLogic() throws Exception {
        Method m = Class.forName("com.example.demo.config.SecurityConfig").getDeclaredMethod("passwordEncoder");
        Assert.assertTrue(m.isAnnotationPresent(org.springframework.context.annotation.Bean.class));
    }

    @Test
    public void t30_securityFilterChainLogic() throws Exception {
        Method m = Class.forName("com.example.demo.config.SecurityConfig")
                .getDeclaredMethod("securityFilterChain",
                        org.springframework.security.config.annotation.web.builders.HttpSecurity.class);
        Assert.assertTrue(m.isAnnotationPresent(org.springframework.context.annotation.Bean.class));
    }

    // =====================================================================================
    // CATEGORY 8: Service Delegation Logic (2 Tests)
    // =====================================================================================
    @Test
    public void t31_roadmapServiceDeleteDelegation() throws Exception {
        Class<?> serviceClazz = Class.forName("com.example.demo.service.RoadmapService");
        boolean hasDelete = Arrays.stream(serviceClazz.getDeclaredMethods())
                .anyMatch(m -> m.getName().toLowerCase().contains("delete") && m.getParameterCount() == 1);
        Assert.assertTrue(hasDelete);
    }

    @Test
    public void t32_roadmapServiceCreateDelegation() throws Exception {
        Class<?> serviceClazz = Class.forName("com.example.demo.service.RoadmapService");
        boolean hasCreate = Arrays.stream(serviceClazz.getDeclaredMethods())
                .anyMatch(m -> (m.getName().toLowerCase().contains("create")
                        || m.getName().toLowerCase().contains("save"))
                        && m.getParameterCount() == 1);
        Assert.assertTrue(hasCreate);
    }
}
