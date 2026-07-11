package com.Projects.CassinoProject.Services;

import com.Projects.CassinoProject.Domain.User;
import com.Projects.CassinoProject.Exections.InsufficientBalanceException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class CassinoRoletarService {
    final UserService userService;
    List<String> slotsRoletar = List.of("1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "2", "2", "2", "2", "2", "2", "2", "3", "3", "3", "3", "3", "3", "4", "4", "4", "4", "5", "5", "5", "6", "6", "7", "⭐", "💎");

    public CassinoRoletarService(UserService userService) {
        this.userService = userService;
    }

    String roletar() {
        return slotsRoletar.get(ThreadLocalRandom.current().nextInt(slotsRoletar.size()));
    }

    public List<String> spin(Authentication authentication) {

        int aposta = 50;
        User user = userService.getUsuarioLogado(authentication);

        if (user.getSaldo() < aposta) {
            throw new InsufficientBalanceException("saldo insuficiente");
        }
        user.setSaldo(user.getSaldo() - aposta);
        user.setRodadas(user.getRodadas() + 1);

        List<String> resultado = List.of(roletar(), roletar(), roletar());

        String a = resultado.get(0);
        String b = resultado.get(1);
        String c = resultado.get(2);

        int premio = 0;

        if (a.equals(b) && b.equals(c)) {
            premio = aposta * 10;
        } else if (a.equals(b) || a.equals(c) || b.equals(c)) {
            premio = aposta * 2;
        }


        if (premio > 0) {
            user.setVitorias(user.getVitorias() + 1);
            user.setSaldo(user.getSaldo() + premio);
            user.setGanhos(user.getGanhos() + premio);
        }
        if (premio == 0) {
            user.setDerrotas(user.getDerrotas() + 1);
            user.setPerdido(user.getPerdido() + 50);
        }
        userService.Save(user);

        return resultado;
    }
}
