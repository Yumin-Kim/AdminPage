package com.schoolproject.schooladminproject.controller.user;

import com.schoolproject.schooladminproject.dto.user.LoginInfo;
import com.schoolproject.schooladminproject.dto.user.UserDto;
import com.schoolproject.schooladminproject.service.user.UserService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Controller
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public String getRemote(@AuthenticationPrincipal LoginInfo loginInfo , Model model) {
        getLoginInfo(loginInfo, model);
        return "user/index";
    }

    // 회원 가입
    @GetMapping("/signup")
    public String getSignupPage(Model model) {
        final UserDto userdto = new UserDto();
        model.addAttribute("user", userdto);
        return "user/signup";
    }

    // TODO validation 추가 완벽하게 할시
    @PostMapping("/signup")
    public String createUser(
            @Validated({UserDto.SignupForm.class})
            @ModelAttribute UserDto user) {
        userService.save(user);
        return "redirect:login";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "user/loginForm";
    }

    @GetMapping("/error")
    public String errorPage(@AuthenticationPrincipal LoginInfo loginInfo , Model model){
        getLoginInfo(loginInfo, model);
        return "redirect:/";
    }

    private Model getLoginInfo(LoginInfo loginInfo, Model model){
        if (loginInfo != null) {
            final Collection<GrantedAuthority> authorities = loginInfo.getAuthorities();
            for (GrantedAuthority a : authorities) {
                final boolean admin = a.getAuthority().equals("ADMIN");
                if (admin) {
                    model.addAttribute("ROLE", admin);
                }else{
                    model.addAttribute("member", loginInfo.getUsername());
                }
            }
        }
        return model;
    }

}
