package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.common.BaseCommonEntity;
import com.schoolproject.schooladminproject.domain.enumtype.CompanyServiceType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Dealer extends BaseCommonEntity {
    @Id
    @GeneratedValue
    @Column(name = "dealer_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private CompanyServiceType mainService;

    private Boolean requestStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dealer_company_id")
    private DealerCompany dealerCompany;

}
