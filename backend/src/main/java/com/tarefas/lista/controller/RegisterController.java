package com.tarefas.lista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tarefas.lista.entity.Users;
import com.tarefas.lista.service.RegisterService;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class RegisterController {
    
    @Autowired
    private RegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users users) {

        // Verifica se já existe o e-mail
        if (registerService.existsByEmail(users.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email já cadastrado"));
        }

        // Verifica se já existe o username
        if (registerService.existsByUsername(users.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Nome de usuário já cadastrado"));
        }

        // Salva o usuário se estiver tudo certo
        registerService.saveUser(users);
        return ResponseEntity.ok(Map.of("message", "Usuário registrado com sucesso"));
    }
}

