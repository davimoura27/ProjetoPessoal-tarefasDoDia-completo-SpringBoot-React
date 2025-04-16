package com.tarefas.lista.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarefas.lista.entity.Tarefa;
import com.tarefas.lista.entity.Users;


public interface TarefaRepository extends JpaRepository<Tarefa,Long> {
    List<Tarefa> findByUsuario(Users usuario);
}
