package com.schoolproject.schooladminproject.service.user;

import com.schoolproject.schooladminproject.domain.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class MemberRes extends User {
    private Member member;
    public MemberRes(Member member) {
        super(member.getUsername(), member.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_"+member.getAuth())));
        this.member = member;
    }
}
