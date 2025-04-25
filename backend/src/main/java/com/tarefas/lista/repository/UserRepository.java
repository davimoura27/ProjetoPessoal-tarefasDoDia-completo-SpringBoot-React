package com.tarefas.lista.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarefas.lista.entity.Users;


public interface UserRepository extends JpaRepository<Users,Long>{
Optional<Users> findByUsername(String username);  
boolean exitentByEmail(String email);
boolean existentByUsername(String username);  
}
