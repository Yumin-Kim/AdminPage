package com.schoolproject.schooladminproject.dto.user;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.enumtype.CompanyServiceType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class BusinessUsedCarDto {
    private String name;//
    private String carKind;//
    private String carColors;//
    private String fuel;//
    private String carTransmissionKind;//
    private Integer modelYear;//
    private Integer price;//
    private String description;//
    private String companyServiceType;//
    private String imageSrc;

    public BusinessUsedCarDto(BusinessUsedCar businessUsedCar) {
        this.name = businessUsedCar.getName();
        this.carKind = businessUsedCar.getCarKind().getDescription();
        this.carColors = businessUsedCar.getColor();
        this.fuel = businessUsedCar.getFuel().getDescription();
        this.carTransmissionKind = businessUsedCar.getCarTransmissionKind().getDescription();
        this.modelYear = businessUsedCar.getModelYear();
        this.description = businessUsedCar.getDescription();
        this.imageSrc = businessUsedCar.getImageSrc();
    }

    public BusinessUsedCarDto() {

    }
}
