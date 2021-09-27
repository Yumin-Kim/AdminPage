package com.schoolproject.schooladminproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RemoteController {
    @GetMapping
    public String getRemote(){
        return "index";
    }
    @GetMapping("/company")
    public String getCompany(){
        return "companycarlist";
    }
}
