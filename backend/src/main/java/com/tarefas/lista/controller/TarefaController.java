package com.tarefas.lista.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import com.tarefas.lista.entity.Tarefa;
import com.tarefas.lista.service.TarefaService;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @PostMapping
    public ResponseEntity<Tarefa> create(@Valid @RequestBody Tarefa tarefa) {
        Tarefa novaTarefa = tarefaService.create(tarefa);
        return ResponseEntity.status(201).body(novaTarefa);

    }
    
    @GetMapping
    public ResponseEntity <List<Tarefa>> listaDeTarefa(){
        List<Tarefa> tarefa = tarefaService.getList();
        return ResponseEntity.ok(tarefa);
    }



    @GetMapping("{id}")
    public ResponseEntity<Tarefa> getByIdTarefas(@PathVariable Long id) {
        Tarefa tarefa = tarefaService.getById(id);
        return ResponseEntity.ok(tarefa);

    }

    @PutMapping("{id}")
    public ResponseEntity<Tarefa> update(@PathVariable Long id, @Valid @RequestBody Tarefa tarefaUpdate) {

        Tarefa tarefaSave = tarefaService.update(id, tarefaUpdate);
        return ResponseEntity.ok(tarefaSave);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTarefa(@PathVariable Long id) {
        tarefaService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Tarefa com ID " + id + " foi deletada");
    }

}
