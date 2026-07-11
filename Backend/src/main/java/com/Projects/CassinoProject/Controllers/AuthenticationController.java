package com.Projects.CassinoProject.Controllers;

import com.Projects.CassinoProject.Domain.AuthenticationDTO;
import com.Projects.CassinoProject.Domain.RegisterDTO;
import com.Projects.CassinoProject.Domain.User;
import com.Projects.CassinoProject.Domain.UserRepository;
import com.Projects.CassinoProject.Infra.Security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TokenService tokenService;

    public AuthenticationController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var userNamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(userNamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if (this.userRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();
        String encryptedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.email(), encryptedPassword, data.role(), data.name());
        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }
}
