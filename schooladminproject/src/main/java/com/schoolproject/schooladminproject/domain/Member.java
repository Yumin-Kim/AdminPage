package com.schoolproject.schooladminproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.schoolproject.schooladminproject.controller.MemberController;
import com.schoolproject.schooladminproject.domain.common.BaseCommonEntity;
import com.schoolproject.schooladminproject.domain.enumtype.MemberPremiumClass;
import com.schoolproject.schooladminproject.dto.PagingMemberDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.StringUtils.hasText;

@Entity
@Getter
@Setter(AccessLevel.PACKAGE)
@NoArgsConstructor
@AllArgsConstructor
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
    
    public static Member createEntity(String s) {
        final Member member = new Member();
        member.setUsername(s);
        return member;
    }

    public void updateEntity(PagingMemberDto.MemberDto memberDto) {
        if (hasText(memberDto.getAddress())) {
            setAddress(memberDto.getAddress());
        }
        if (hasText(memberDto.getDescription())) {
            setDescription(memberDto.getDescription());
        }
        if (hasText((memberDto.getEmail()))) {
            setEmail(memberDto.getEmail());
        }
        if (hasText(memberDto.getName())) {
            setName(memberDto.getName());
        }
        if (hasText(memberDto.getPhoneNumber())) {
            setPhoneNumber(memberDto.getPhoneNumber());
        }
        if (hasText(memberDto.getUsername())) {
            setUsername(memberDto.getUsername());
        }
        if (hasText(memberDto.getRecommendMember())) {
            setRecommendMember(memberDto.getRecommendMember());
        }
        if (memberDto.getPoint() != null) {
            setPoint(memberDto.getPoint());
        }
        if (memberDto.getMemberPremiumClass() != null) {
            setMemberPremiumClass(memberDto.getMemberPremiumClass());
        }
    }
}
