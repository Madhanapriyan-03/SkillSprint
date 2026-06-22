package com.example.demo.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface SprintAccountRepository
        extends JpaRepository<SprintAccount, Long> {

    Optional<SprintAccount> findByEmail(String email);
}
