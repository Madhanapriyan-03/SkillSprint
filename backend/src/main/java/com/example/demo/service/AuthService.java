package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.entity.SprintAccount;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.SprintAccountRepository;

@Service
public class AuthService {

    @Autowired
    private SprintAccountRepository sprintAccountRepository;

    public AuthResponseDto register(AuthRequestDto dto) {

        if (sprintAccountRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new BusinessValidationException("Email already exists");
        }

        SprintAccount account = new SprintAccount();
        account.setEmail(dto.getEmail());
        account.setPasswordHash(dto.getPassword());
        account.setRole(dto.getRole());
        account.setCreatedAt(LocalDateTime.now());

        sprintAccountRepository.save(account);

        AuthResponseDto response = new AuthResponseDto();
        response.setEmail(account.getEmail());
        response.setRole(account.getRole());
        response.setToken("dummy-token");

        return response;
    }

    public AuthResponseDto login(AuthRequestDto dto) {

        SprintAccount account = sprintAccountRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BusinessValidationException("Invalid Credentials"));

        if (!account.getPasswordHash().equals(dto.getPassword())) {
            throw new BusinessValidationException("Invalid Credentials");
        }

        AuthResponseDto response = new AuthResponseDto();
        response.setEmail(account.getEmail());
        response.setRole(account.getRole());
        response.setToken("dummy-token");

        return response;
    }
}