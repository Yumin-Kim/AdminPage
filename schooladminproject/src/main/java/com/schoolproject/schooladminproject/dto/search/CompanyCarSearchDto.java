package com.schoolproject.schooladminproject.dto.search;

import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CompanyCarSearchDto {
    private Integer createdModelYear;
    private Integer lastedModelYear;
    private Integer greaterEqualDistance;
    private Integer lessEqualDistance;
    private Integer greaterEqualPrice;
    private Integer lessEqualPrice;
    private CarFuelType fuel;
    private String name;
    private String color;
    private CarTransmissionKind carTransmissionKind;
    private String modelOption;
    private Integer passengers;
    private Boolean isImageSrc;
    private String registerAdminName;
    private LocalDateTime createdAt;
    private LocalDateTime lastCreatedAt;
}
