package com.schoolproject.schooladminproject.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class SiteUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private String password;
    private String role;

    @Builder
    private SiteUser(String name, String password, String role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public static SiteUser createEntity(String name,String password,String role){
        return SiteUser.builder()
                .name(name)
                .password(password)
                .role(role)
                .build();
    }
}
