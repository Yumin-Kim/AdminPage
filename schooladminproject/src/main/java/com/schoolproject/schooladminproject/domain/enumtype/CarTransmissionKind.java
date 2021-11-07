package com.schoolproject.schooladminproject.domain.enumtype;


import lombok.Getter;

@Getter
public enum CarTransmissionKind {
    AUTOMATIC("자동"),STICK("수동");

    private String description;

    CarTransmissionKind(String description) {
        this.description = description;
    }
}