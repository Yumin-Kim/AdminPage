package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.common.BaseDateEntity;
import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter(AccessLevel.PACKAGE)
@NoArgsConstructor
@AllArgsConstructor
public class CarInfo extends BaseDateEntity {
    private Integer modelYear;
    private Integer distance;
    private Integer price;
    @Enumerated(EnumType.STRING)
    private CarFuelType fuel;
    private String name;
    private String color;
    @Enumerated(EnumType.STRING)
    private CarTransmissionKind carTransmissionKind;
    @Enumerated(EnumType.STRING)
    private CarKind carKind;
    private String modelOption;
    private Integer passengers;
    @Column(columnDefinition = "LONGTEXT")
    private String imageSrc;




}

