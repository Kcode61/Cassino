package com.Projects.CassinoProject.Infra.Security;

import com.Projects.CassinoProject.Domain.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withIssuer("auth-admin")
                .withSubject(user.getEmail())
                .sign(algorithm);
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            JWTVerifier verifier =
                    JWT.require(algorithm)
                            .withIssuer("auth-admin")
                            .build();

            var auth = verifier.verify(token);
            return auth.getSubject();
        } catch (JWTVerificationException e) {
            return "";
        }
    }

    ;
}
