package com.example.demo.repository;

import com.example.demo.entity.SprintAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SprintAccountRepository extends JpaRepository<SprintAccount, Long> {

    Optional<SprintAccount> findByEmail(String email);

    Page<SprintAccount> findByRole(String role, Pageable pageable);
}