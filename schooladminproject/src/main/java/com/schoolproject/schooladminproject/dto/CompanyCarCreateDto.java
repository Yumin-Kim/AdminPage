package com.schoolproject.schooladminproject.dto;

import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyCarCreateDto {
    private Integer modelYear;
    private Integer distance;
    private Integer price;
    private CarFuelType fuel;
    private String name;
    private String color;
    private CarTransmissionKind carTransmissionKind;
    private String modelOption;
    private Integer passengers;
    private String imageSrc;
    private Long adminId;
}
