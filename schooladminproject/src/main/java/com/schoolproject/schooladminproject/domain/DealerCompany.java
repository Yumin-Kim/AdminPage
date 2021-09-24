package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.common.BaseDateEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class DealerCompany extends BaseDateEntity {
    @Id
    @GeneratedValue
    @Column(name = "dealer_company_id")
    private Long id;

    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private Integer assignmentMember;
    private Integer companyVehicle;

    @OneToMany(mappedBy = "dealerCompany")
    private List<Dealer> dealers = new ArrayList<>();

}
