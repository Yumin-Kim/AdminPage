package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.common.BaseCommonEntity;
import com.schoolproject.schooladminproject.domain.enumtype.MemberPremiumClass;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseCommonEntity {
    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private MemberPremiumClass memberPremiumClass;

    private String recommendMember;

    private Integer point;

    @OneToMany(mappedBy = "member")
    private List<BusinessUsedCar> businessUsedCar = new ArrayList<>();

}
