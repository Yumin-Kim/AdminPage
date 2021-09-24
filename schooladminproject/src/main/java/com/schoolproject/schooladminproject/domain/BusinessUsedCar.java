package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.enumtype.CompanyServiceType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// 서비스 별 차량 정보
@Entity
@Getter
@NoArgsConstructor
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
}
