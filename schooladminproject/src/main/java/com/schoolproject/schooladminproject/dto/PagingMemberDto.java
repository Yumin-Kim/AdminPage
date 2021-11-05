package com.schoolproject.schooladminproject.dto;

import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.domain.enumtype.MemberPremiumClass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PagingMemberDto {
    List<MemberDto> members = new ArrayList<>();
    private Integer totalElements;
    private Integer currentElements;
    private Integer currentPages;
    private Integer totalPages;

    /**
     * @param content          컨텐츠
     * @param getElements      현재 데이터 갯수
     * @param getTotalElements 전체 데이터 수
     * @param size             페이지 크기
     * @param number           현재 페이지
     */
    public PagingMemberDto(List<Member> content, Integer getElements, int getTotalElements, int size, int number) {
        this.members = content.stream()
                .map(member -> new MemberDto(member))
                .collect(toList());
        this.currentElements = getElements;
        this.totalElements = getTotalElements;
        this.currentPages = number;
        this.totalPages = size;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberDto {
        private Long id;
        private MemberPremiumClass memberPremiumClass;
        private String recommendMember;
        private Integer point;
        private String name;
        private String email;
        private String username;
        private String address;
        private String description;
        private String phoneNumber;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private LocalDateTime deletedAt;
        private List<CarInfoDto> businessUsedCars = new ArrayList<>();

        public MemberDto(Member member) {
            this.id = member.getId();
            this.memberPremiumClass = member.getMemberPremiumClass();
            this.recommendMember = member.getRecommendMember();
            this.point = member.getPoint();
            this.name = member.getName();
            this.email = member.getEmail();
            this.username = member.getUsername();
            this.address = member.getAddress();
            this.description = member.getDescription();
            this.phoneNumber = member.getPhoneNumber();
            this.createdAt = member.getCreatedAt();
            this.modifiedAt = member.getModifiedAt();
            this.deletedAt = member.getDeletedAt();
            if (member.getBusinessUsedCar().size() != 0) {
                this.businessUsedCars = member.getBusinessUsedCar().stream()
                        .map(data -> new CarInfoDto(data))
                        .collect(toList());
            }
        }
    }
}
