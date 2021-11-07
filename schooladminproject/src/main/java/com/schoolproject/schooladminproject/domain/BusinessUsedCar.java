package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import com.schoolproject.schooladminproject.domain.enumtype.CompanyServiceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// 서비스 별 차량 정보
@Entity
@Getter
@NoArgsConstructor
@Table(name = "business_used_car")
public class BusinessUsedCar extends CarInfo {

    @Id
    @GeneratedValue
    @Column(name = "business_used_car_id")
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private CompanyServiceType companyServiceType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public BusinessUsedCar(String description) {
        this.description = description;
    }

    public BusinessUsedCar(String description, Member member) {
        this.description = description;
        this.member = member;
    }
    public static BusinessUsedCar createEntity(String description ){
        return new BusinessUsedCar(description);
    }

    @Builder
    private BusinessUsedCar(Integer modelYear, Integer distance, Integer price, CarFuelType fuel, String name, String color, CarTransmissionKind carTransmissionKind, CarKind carKind, String modelOption, Integer passengers, String imageSrc, String description) {
        super(modelYear, distance, price, fuel, name, color, carTransmissionKind, carKind, modelOption, passengers, imageSrc);
        this.description = description;
    }

    public static BusinessUsedCar createEntity(String name, String carKind, String fuel, String carTransmissionKind, Integer modelYear, Integer price, String description, String carColors, String imageSrc) {
        return BusinessUsedCar.builder()
                .modelYear(modelYear)
                .name(name)
                .carKind(CarKind.valueOf(carKind))
                .fuel(CarFuelType.valueOf(fuel))
                .carTransmissionKind(CarTransmissionKind.valueOf(carTransmissionKind))
                .price(price)
                .description(description)
                .color(carColors)
                .imageSrc(imageSrc)
                .build();
    }

    public void addMember(Member member) {
        this.member = member;
    }
}

