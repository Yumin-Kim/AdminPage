package com.schoolproject.schooladminproject.controller.user;

import com.schoolproject.schooladminproject.dto.user.UserDto;
import com.schoolproject.schooladminproject.service.user.UserService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@Slf4j
@RequiredArgsConstructor
public class CustomController {

    private final UserService userService;

    @GetMapping
    public String getRemote() {
        return "user/index";
    }

    // 회원 가입
    @GetMapping("/signup")
    public String getSignupPage(Model model) {
        final UserDto userdto = new UserDto();
        model.addAttribute("user", userdto);
        return "user/signup";
    }

    @PostMapping("/signup")
    public String createUser(@ModelAttribute UserDto user) {
        log.info("createUser {}",user);
        user.setAuth("ADMIN");
        userService.save(user);
        return "redirect:login";
    }

    // 로그인
    //사용자와 관리자 따로 개발할지?
    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("user", new UserDto());
        return "user/loginForm";
    }

    // 사용자 차량 등록
    @GetMapping("/register")
    public String registerCarInfo() {
        return "user/registerCar";
    }

    // 사용자 차량 조회
    @GetMapping("/usercar")
    public String getUserCarInfo() {
        return "user/userCarList";
    }

    // 차량 조회
    @GetMapping("/carinfo")
    public String getCarInfos() {
        return "user/carList";
    }

    //어드민 계정 로그인
    @GetMapping("/adminsignup")
    public String createAdmin() {
        return "/user/adminSignup";
    }


}
