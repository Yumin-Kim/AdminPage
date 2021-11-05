package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.common.BaseCommonEntity;
import com.schoolproject.schooladminproject.domain.enumtype.MemberPremiumClass;
import com.schoolproject.schooladminproject.dto.PagingMemberDto;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

import static org.springframework.util.StringUtils.hasText;

@Entity
@Getter
@Setter(AccessLevel.PACKAGE)
public class Member extends BaseCommonEntity implements UserDetails {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;
    @Column(unique = true)
    private String name;
    @Enumerated(EnumType.STRING)
    private MemberPremiumClass memberPremiumClass;

    private String recommendMember;

    private Integer point;
    private String email;

    @Column(name = "auth")
    private String auth;

    @OneToMany(mappedBy = "member")
    private List<BusinessUsedCar> businessUsedCar = new ArrayList<>();

    @Builder
    protected Member(String name, String password, String email,String auth) {
        super(password);
        this.auth = auth;
        this.name = name;
        this.email = email;
    }

    public static Member createEntity(String loginName, String loginPassword, String email, String auth) {
        return new Member(loginName, loginPassword, email , auth);
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


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        final Set<GrantedAuthority> roles = new HashSet<>();
        for (String role : auth.split(",")){
            roles.add(new SimpleGrantedAuthority(role));
        }
        return roles;
    }

    @Override
    public String getUsername() {
        return email;
    }

    // 계정 만료
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 꼦벙 사용 가능 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
