package com.schoolproject.schooladminproject.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

public interface CRUDBaseController {

    @PostMapping
    public String createEntity();

    @GetMapping
    public String getEntity(Model model);

    @PutMapping
    public String updateEntity();

    @DeleteMapping
    public String deleteEntity();
}
