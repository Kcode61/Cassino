package com.Projects.CassinoProject.Infra.Security;


import com.Projects.CassinoProject.Domain.User;
import com.Projects.CassinoProject.Domain.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private TokenService tokenService;

    private UserRepository userRepository;

    private User user;

    public SecurityFilter(TokenService tokenService,
                          UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            return null;
        }

        return authHeader.replace("Bearer ", "");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = recoverToken(request);

        if (token != null && !token.isBlank()) {
            String email = tokenService.validateToken(token);
            if (email != null && !email.isBlank()) {
                UserDetails user = userRepository.findByEmail(email);
                if (user != null) {
                    Authentication authentication =
                            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
