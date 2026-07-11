package com.Projects.CassinoProject.Domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private int ganhos;
    private int rodadas;
    private String email;
    private int perdido;
    private String password;
    private int saldo;
    private int vitorias = 0;
    private int derrotas = 0;
    @Enumerated(EnumType.STRING)
    private Cargo cargo;

    public User(String email, String password, Cargo role, String name) {
        this.email = email;
        this.password = password;
        this.cargo = role;
        this.name = name;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.cargo == Cargo.ADMIN)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), (new SimpleGrantedAuthority("ROLE_USER")), (new SimpleGrantedAuthority("ROLE_VIP")));
        else if (this.cargo == Cargo.VIP)
            return List.of(new SimpleGrantedAuthority("ROLE_VIP"), (new SimpleGrantedAuthority("ROLE_USER")));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return email;
    }
}
