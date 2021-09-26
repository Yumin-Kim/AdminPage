package com.schoolproject.schooladminproject.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

public interface CRUDBaseController {

    @PostMapping
    Object  createEntity();

    @GetMapping
    Object getEntity(Model model, Pageable pageable);

    @PutMapping
    Object  updateEntity();

    @DeleteMapping
    Object  deleteEntity();
}
