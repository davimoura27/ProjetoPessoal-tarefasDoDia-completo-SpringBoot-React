package com.tarefas.lista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tarefas.lista.config.JwtUtil;
import com.tarefas.lista.controller.dto.UserAuthenticationDto;
import com.tarefas.lista.login.LoginRequest;
import com.tarefas.lista.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

   @Autowired
   private AuthenticationManager authenticationManager;

   @Autowired
   private UserRepository userRepository;

   @Autowired
   private JwtUtil jwtUtil;

   private final ObjectMapper objectMapper;

    public AuthController()
    {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

   @PostMapping("/login")
   public ResponseEntity<String> login(@Valid @RequestBody LoginRequest loginRequest) {
      Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
     
      var userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

      var user = userRepository.findByUsername(userDetails.getUsername())
      .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));


      var userAuthenticationDto = new UserAuthenticationDto();
      userAuthenticationDto.setToken(jwtUtil.generateToken(user.getUsername()));
      userAuthenticationDto.setUserId(user.getId());
      try {
         return ResponseEntity.ok(objectMapper.writeValueAsString(userAuthenticationDto));
      }catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }
   }
}
