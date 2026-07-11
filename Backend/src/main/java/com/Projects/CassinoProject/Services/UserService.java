package com.Projects.CassinoProject.Services;

import com.Projects.CassinoProject.Domain.User;
import com.Projects.CassinoProject.Domain.UserRepository;
import com.Projects.CassinoProject.Exections.UserNotFound;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User getUsuarioLogado(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }

    public void deletarUsuario(int id) {
        userRepository.deleteById(id);
    }

    public User Save(User user) {
        return userRepository.save(user);
    }

    public List<User> listarUsuarios() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "saldo"));
    }


}
