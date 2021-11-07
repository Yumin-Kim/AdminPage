package com.schoolproject.schooladminproject.dto.user;

import com.schoolproject.schooladminproject.domain.SiteUser;
import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDto {

    public interface loginForm{}
    public interface SignupForm{}

    @NotBlank(message = "이름을 입력해주세요",groups = {SignupForm.class})
    private String name;
    private String password;
    @NotBlank(message = "이메일을 입력해주세요",groups = {loginForm.class,SignupForm.class})
    private String email;
    @NotNull
    private String auth;
}



