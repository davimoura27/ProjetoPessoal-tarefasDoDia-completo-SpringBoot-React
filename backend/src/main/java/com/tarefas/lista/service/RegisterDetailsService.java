package com.tarefas.lista.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tarefas.lista.entity.Users;
import com.tarefas.lista.repository.UserRepository;

@Service
public class RegisterDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Users users = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado com o username:" + username));
    return new org.springframework.security.core.userdetails.User(
        users.getUsername(), users.getPassword(), Collections.emptyList());
    }
}
