package com.schoolproject.schooladminproject.dto;

import com.schoolproject.schooladminproject.domain.CompanyCar;
import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PagingCompanyCarDto {

    private List<CompanyCarDto> companyCarDtos = new ArrayList<>();
    private Integer totalElements;
    private Integer currentElements;
    private Integer currentPages;
    private Integer totalPages;

    public PagingCompanyCarDto(List<CompanyCarDto> companyCarDtos, Integer totalElements, Integer currentElements, Integer currentPages, Integer totalPages) {
        this.companyCarDtos = companyCarDtos;
        this.totalElements = totalElements;
        this.currentElements = currentElements;
        this.currentPages = currentPages;
        this.totalPages = totalPages;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class CompanyCarDto {
        private Long id;
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
        private String registerAdminName;


        public CompanyCarDto(CompanyCar companyCar) {
            id = companyCar.getId();
            modelYear = companyCar.getModelYear();
            distance = companyCar.getDistance();
            price = companyCar.getPrice();
            fuel = companyCar.getFuel();
            name = companyCar.getName();
            color = companyCar.getColor();
            carTransmissionKind = companyCar.getCarTransmissionKind();
            modelOption = companyCar.getModelOption();
            imageSrc = companyCar.getImageSrc();
//            registerAdminName = companyCar.getAdmin().getName();
        }
    }
}

