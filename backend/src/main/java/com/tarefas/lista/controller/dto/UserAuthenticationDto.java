package com.tarefas.lista.controller.dto;

import lombok.Data;

@Data
public class UserAuthenticationDto {
    private String token;
    private Long userId;

}
