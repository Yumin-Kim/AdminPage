package com.schoolproject.schooladminproject.dto;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import com.schoolproject.schooladminproject.domain.enumtype.CompanyServiceType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CarInfoDto {
    private Long id;
    private String description;
    private CompanyServiceType companyServiceType;
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

    public CarInfoDto(BusinessUsedCar data) {
        this.id = data.getId();
        this.description = data.getDescription();
        this.companyServiceType = data.getCompanyServiceType();
        this.modelYear = data.getModelYear();
        this.distance = data.getDistance();
        this.price = data.getPrice();
        this.fuel = data.getFuel();
        this.name = data.getName();
        this.color = data.getColor();
        this.carTransmissionKind = data.getCarTransmissionKind();
        this.modelOption = data.getModelOption();
        this.passengers = data.getPassengers();
        this.imageSrc = data.getImageSrc();
    }
}
