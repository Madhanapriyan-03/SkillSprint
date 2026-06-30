package com.example.demo.security;

import com.example.demo.entity.SprintAccount;
import com.example.demo.repository.SprintAccountRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final SprintAccountRepository repository;

    public CustomUserDetailsService(SprintAccountRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        SprintAccount account = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new User(
                account.getEmail(),
                account.getPasswordHash(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + account.getRole()))
        );
    }
}