package com.Projects.CassinoProject.Exections;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

public class GlobalExceptions {
    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFound ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }
    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<String> handleInsufficientBallance(InsufficientBalanceException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }

}
