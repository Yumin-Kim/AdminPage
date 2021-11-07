package com.schoolproject.schooladminproject.dto.user;

import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.domain.SiteUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import java.util.List;

@Getter
public class LoginInfo extends User {
    private Member member;
    public LoginInfo(Member findUser) {
        super(findUser.getName(), findUser.getPassword(), List.of(new SimpleGrantedAuthority(findUser.getAuth())));
        this.member = member;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class ResData{
        private String name;
        private String email;
        private Long id;
        private String auth;
    }

    public static LoginInfo.ResData mapping(LoginInfo loginInfo) {
//        return new ResData(loginInfo.getUsername(), member.getEmail(), member.getId(), member.getAuth());
        return null;
    }
}
