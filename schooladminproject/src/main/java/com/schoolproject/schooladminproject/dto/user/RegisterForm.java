package com.schoolproject.schooladminproject.dto.user;

import com.schoolproject.schooladminproject.controller.user.CarColor;
import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.CarKind;
import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import com.schoolproject.schooladminproject.domain.enumtype.CompanyServiceType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterForm {
    @NotBlank(message = "이름이 존재하지 않습니다.")
    private String name;//
    @NotBlank(message = "차량 종류이 존재하지 않습니다.")
    private String carKind;//
    @NotBlank(message = "차량 색상이 존재하지 않습니다.")
    private String carColors;//

    @NotBlank(message = "연료종류이 존재하지 않습니다.")
    private String fuel;//
    @NotBlank(message = "변속기 종류이 존재하지 않습니다.")
    private String carTransmissionKind;//
    private Integer modelYear;//
    private Integer price;//
    private MultipartFile multipartFile;//
    @NotBlank(message = "설명이 존재하지 않습니다.")
    private String description;//

    public BusinessUsedCar toEntity(RegisterForm carInfo, String imageSrc) {
        return BusinessUsedCar.createEntity(carInfo.getName(), carInfo.getCarKind(), carInfo.getFuel(), carInfo.getCarTransmissionKind(), carInfo.getModelYear(), carInfo.getPrice(), carInfo.getDescription(),carInfo.getCarColors(),imageSrc);
    }
}
