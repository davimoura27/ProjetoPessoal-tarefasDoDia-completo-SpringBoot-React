package com.tarefas.lista.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReloadPagController {
    @RequestMapping(value = {"/{path:[^\\.]*}","/**{path:[^\\.]*}"})
    public String redirect(){
        return "forward:/index.html";
    }
}
