package com.tarefas.lista.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.tarefas.lista.entity.Users;
import com.tarefas.lista.service.RegisterService;

@RestController
@RequestMapping("/users")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users users){
         if (registerService.existentsByEmail(users.getEmail())) {
            return ResponseEntity.badRequest()
            .body(Map.of("message", "Email já cadastrado!"));
         }
         if (registerService.existentsByUsername(users.getUsername())) {
            return ResponseEntity.badRequest()
            .body(Map.of("message" , "Nome de usuario já cadastrado"));
         }
 

        registerService.saveUser(users);
        return ResponseEntity.ok("Usuario registrado com sucesso");
    }
}
