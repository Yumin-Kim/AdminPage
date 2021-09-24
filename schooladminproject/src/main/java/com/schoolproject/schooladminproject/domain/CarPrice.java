package com.schoolproject.schooladminproject.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

//차량 시세 정보
@Entity
@Getter
@NoArgsConstructor
public class CarPrice extends CarInfo {
    @Id
    @GeneratedValue
    @Column(name = "car_price_id")
    private Long id;
}
