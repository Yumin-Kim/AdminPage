package com.schoolproject.schooladminproject.controller;

import com.schoolproject.schooladminproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController implements CRUDBaseController {

    private final MemberRepository memberRepository;

    @Override
    public String createEntity() {
        return "post";
    }

    @Override
    public String getEntity(Model model) {

        return "get";
    }

    @Override
    public String updateEntity() {
        return "update";
    }

    @Override
    public String deleteEntity() {
        return "delete";
    }
}
