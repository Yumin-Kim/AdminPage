package com.schoolproject.schooladminproject.dto.search;

import com.schoolproject.schooladminproject.domain.enumtype.MemberPremiumClass;
import com.schoolproject.schooladminproject.dto.CarInfoDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MemberSearchCondDto {
    private MemberPremiumClass memberPremiumClass;
    private String recommendMember;
    private Integer greaterEqualPoint;
    private Integer lessEqualPoint;
    private String name;
    private String email;
    private String username;
    private String phoneNumber;
    private LocalDateTime createdAt;
    private LocalDateTime lastCreatedAt;
    private String modelName;
    private Boolean isCared;
    private Boolean isRecommendMember;
    private Boolean isDescription;

}
