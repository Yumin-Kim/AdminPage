package com.schoolproject.schooladminproject.dto;

import com.schoolproject.schooladminproject.domain.SiteUser;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public class SiteUserRes extends User {
    public SiteUserRes(SiteUser findUser) {
        super(findUser.getName(),findUser.getPassword(), List.of(new SimpleGrantedAuthority(findUser.getRole())));
    }
}
