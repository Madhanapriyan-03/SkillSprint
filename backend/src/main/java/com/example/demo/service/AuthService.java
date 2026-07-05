package com.example.demo.service;

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.entity.SprintAccount;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.SprintAccountRepository;
import com.example.demo.security.CustomUserDetailsService;
import com.example.demo.security.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final SprintAccountRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public AuthService(SprintAccountRepository repository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    public AuthResponseDto register(AuthRequestDto dto) {
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new BusinessValidationException("Email already in use");
        }
        SprintAccount account = new SprintAccount();
        account.setEmail(dto.getEmail());
        account.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        account.setRole(dto.getRole() == null ? "STUDENT" : dto.getRole());
        account.setCreatedAt(LocalDateTime.now());
        
        repository.save(account);

        return login(dto);
    }

    public AuthResponseDto login(AuthRequestDto dto) {
        SprintAccount account = repository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new BusinessValidationException("Invalid credentials"));

        if (!passwordEncoder.matches(dto.getPassword(), account.getPasswordHash())) {
            throw new BusinessValidationException("Invalid credentials");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getEmail());

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", account.getRole());

        String token = jwtUtil.generateToken(extraClaims, userDetails);
        return new AuthResponseDto(token, account.getRole(), account.getEmail());
    }
}
