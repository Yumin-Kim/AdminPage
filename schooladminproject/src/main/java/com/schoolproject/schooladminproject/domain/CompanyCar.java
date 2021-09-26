package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import com.schoolproject.schooladminproject.dto.CompanyCarCreateDto;
import com.schoolproject.schooladminproject.dto.PagingCompanyCarDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static org.springframework.util.StringUtils.hasText;

// 차차차 보유 차량
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "company_car")
public class CompanyCar extends CarInfo {
    @Id
    @GeneratedValue
    @Column(name = "company_car_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    protected CompanyCar(Integer modelYear, Integer distance, Integer price, CarFuelType fuel, String name, String color, CarTransmissionKind carTransmissionKind, String modelOption, Integer passengers, String imageSrc,Admin admin) {
        super(modelYear, distance, price, fuel, name, color, carTransmissionKind, modelOption, passengers, imageSrc);
        this.admin = admin;
    }

    public static CompanyCar createEntity(CompanyCarCreateDto companyCarCreateDto, Admin admin) {
        return new CompanyCar(companyCarCreateDto.getModelYear(), companyCarCreateDto.getDistance(), companyCarCreateDto.getPrice(), companyCarCreateDto.getFuel(), companyCarCreateDto.getName(), companyCarCreateDto.getColor(), companyCarCreateDto.getCarTransmissionKind(), companyCarCreateDto.getModelOption(), companyCarCreateDto.getPassengers(), companyCarCreateDto.getImageSrc(), admin);
    }

    public void updateEntity(PagingCompanyCarDto.CompanyCarDto companyCarDto) {
        if (hasText(companyCarDto.getColor())) {
            setColor(companyCarDto.getColor());
        }
        if (hasText(companyCarDto.getName())) {
            setName(companyCarDto.getName());
        }
        if (hasText(companyCarDto.getImageSrc())) {
            setImageSrc(companyCarDto.getImageSrc());
        }
        if (hasText(companyCarDto.getModelOption())) {
            setModelOption(companyCarDto.getModelOption());
        }
        if (companyCarDto.getDistance() != null) {
            setDistance(companyCarDto.getDistance());
        }
        if (companyCarDto.getFuel() != null) {
            setFuel(companyCarDto.getFuel());
        }
        if (companyCarDto.getModelYear() != null) {
            setModelYear(companyCarDto.getModelYear());
        }
        if (companyCarDto.getPassengers() != null) {
            setPassengers(companyCarDto.getPassengers());
        }
        if (companyCarDto.getPrice() != null) {
            setPrice(companyCarDto.getPrice());
        }
    }

    public void updateEntity(PagingCompanyCarDto.CompanyCarDto companyCarDto, Admin admin) {
        this.updateEntity(companyCarDto);
        this.admin = admin;
    }
}
