package com.schoolproject.schooladminproject.domain;

import lombok.Getter;

@Getter
public enum CarKind {
    MIN("소형"),
    MEDIUM("중형"),
    SUV("SUV"),
    ANY("기타");
    private String description;

    CarKind(String description) {
        this.description = description;
    }
}
