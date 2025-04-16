package com.tarefas.lista.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity

public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title", nullable = false)
    private String titulo;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "status", nullable = false)
    private String status = "pendente";

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users usuario;
}
