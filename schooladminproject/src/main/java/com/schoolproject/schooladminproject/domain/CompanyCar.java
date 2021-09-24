package com.schoolproject.schooladminproject.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// 차차차 보유 차량
@Entity
@Getter
@NoArgsConstructor
public class CompanyCar extends CarInfo {
    @Id
    @GeneratedValue
    @Column(name = "company_car_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

}
