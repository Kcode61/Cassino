package com.Projects.CassinoProject.Controllers;

import com.Projects.CassinoProject.Domain.BalanceDTO;
import com.Projects.CassinoProject.Domain.User;
import com.Projects.CassinoProject.Domain.UserUpdateDTO;
import com.Projects.CassinoProject.Exections.InsufficientBalanceException;
import com.Projects.CassinoProject.Services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public User buscarUsuarioLogado(Authentication authentication) {
        return userService.getUsuarioLogado(authentication);
    }

    @DeleteMapping("/me")
    public void DeletarUser(Authentication authentication) {
        User usuario = userService.getUsuarioLogado(authentication);
        userService.deletarUsuario(usuario.getId());
    }

    @GetMapping()
    public List<User> listarUsuarios() {
        return userService.listarUsuarios();
    }

    @PatchMapping("/me")
    public User atualizarUsuario(Authentication authentication, @RequestBody UserUpdateDTO dto) {

        User usuario = userService.getUsuarioLogado(authentication);
        usuario.setName(dto.getName());
        usuario.setEmail(dto.getEmail());
        usuario.setName(dto.getName());
        return userService.Save(usuario);
    }

    @PatchMapping("/me/balance/deposit")
    public User depositarSaldo(Authentication authentication, @RequestBody BalanceDTO dto) {

        User usuario = userService.getUsuarioLogado(authentication);
        usuario.setSaldo(usuario.getSaldo() + dto.getAmount());
        return userService.Save(usuario);
    }

    @GetMapping("/me/balance")
    public User acessarSaldo(Authentication authentication) {
        User usuario = userService.getUsuarioLogado(authentication);
        return usuario;
    }

    @PatchMapping("/me/balance/withdraw")
    public User sacarSaldo(Authentication authentication, @RequestBody BalanceDTO dto) {
        User usuario = userService.getUsuarioLogado(authentication);
        if (usuario.getSaldo() < dto.getAmount()) {
            throw new InsufficientBalanceException("Saldo insuficiente");
        }

        usuario.setSaldo(usuario.getSaldo() - dto.getAmount());

        return userService.Save(usuario);
    }
}
