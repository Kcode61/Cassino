package com.Projects.CassinoProject.Controllers;

import com.Projects.CassinoProject.Services.CassinoRoletarService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/cassino")
@RestController

public class CassinoController {


    private CassinoRoletarService cassinoRoletar;

    public CassinoController(CassinoRoletarService cassinoRoletar) {
        this.cassinoRoletar = cassinoRoletar;
    }

    @PostMapping("/spin/me")
    public List<String> spin(Authentication authentication) {
        return cassinoRoletar.spin(authentication);
    }
}
