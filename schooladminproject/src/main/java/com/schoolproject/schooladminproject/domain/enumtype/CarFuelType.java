package com.schoolproject.schooladminproject.domain.enumtype;

import lombok.Getter;

@Getter
public enum CarFuelType {
    GAS("가스"),GASOLINE("가솔린"),DIESEL("디젤");
    private String description;

    CarFuelType(String description) {
        this.description = description;
    }
}
