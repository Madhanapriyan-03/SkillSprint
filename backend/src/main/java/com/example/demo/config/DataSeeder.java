package com.example.demo.config;

import com.example.demo.entity.SprintAccount;
import com.example.demo.repository.SprintAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SprintAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            SprintAccountRepository accountRepository,
            PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        if (accountRepository.count() == 0) {

            System.out.println("Seeding default database records...");

            SprintAccount manager = new SprintAccount();
            manager.setEmail("manager@skillsprint.com");
            manager.setPasswordHash(passwordEncoder.encode("password123"));
            manager.setRole("LEARNING_MANAGER");
            manager.setCreatedAt(LocalDateTime.now());

            SprintAccount mentor = new SprintAccount();
            mentor.setEmail("mentor@skillsprint.com");
            mentor.setPasswordHash(passwordEncoder.encode("password123"));
            mentor.setRole("MENTOR");
            mentor.setCreatedAt(LocalDateTime.now());

            SprintAccount student = new SprintAccount();
            student.setEmail("student@skillsprint.com");
            student.setPasswordHash(passwordEncoder.encode("password123"));
            student.setRole("STUDENT");
            student.setCreatedAt(LocalDateTime.now());

            accountRepository.save(manager);
            accountRepository.save(mentor);
            accountRepository.save(student);

            System.out.println("Default users created!");
            System.out.println("- manager@skillsprint.com / password123");
            System.out.println("- mentor@skillsprint.com / password123");
            System.out.println("- student@skillsprint.com / password123");
        }
    }
}