package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.SprintAccount;

@Repository
public interface SprintAccountRepository
        extends JpaRepository<SprintAccount, Long> {

    Optional<SprintAccount> findByEmail(String email);
}