package com.schoolproject.schooladminproject.dto.user;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDto {
    private String name;
    private String password;
    private String email;
    private String auth;
}
