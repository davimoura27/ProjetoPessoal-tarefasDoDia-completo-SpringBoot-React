package com.tarefas.lista.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tarefas.lista.entity.Tarefa;
import com.tarefas.lista.entity.Users;
import com.tarefas.lista.repository.TarefaRepository;
import com.tarefas.lista.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service

public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UserRepository userRepository;

    public Tarefa create(Tarefa tarefa) {
        String username = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        Users usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));
        tarefa.setUsuario(usuario);
        return tarefaRepository.save(tarefa);

    }

    public List<Tarefa> getList() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));

        return tarefaRepository.findByUsuario(usuario);
    }

    public Tarefa getById(Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarefa com o ID" + id + "não encontrada"));
    }

    public Tarefa update(Long id, Tarefa tarefaUpdate) {
        Tarefa tarefa = getById(id);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));

        if (!tarefa.getUsuario().equals(usuario)) {
            throw new SecurityException("Usuaio não tem permissão para editar essa tarefa");

        }
        if (tarefaUpdate.getTitulo() != null) {
            tarefa.setTitulo(tarefaUpdate.getTitulo());
        }
        if (tarefaUpdate.getCategoria() != null) {
            tarefa.setCategoria(tarefaUpdate.getCategoria());

        }
        if (tarefaUpdate.getStatus() != null) {
            tarefa.setStatus(tarefaUpdate.getStatus());
        }
        return tarefaRepository.save(tarefa);

    }

    public void delete(Long id) {
        if (!tarefaRepository.existsById(id)) {
            throw new EntityNotFoundException("Tarefa com o Id" + id + "não encontrada");
        }

        tarefaRepository.deleteById(id);
    }

}
