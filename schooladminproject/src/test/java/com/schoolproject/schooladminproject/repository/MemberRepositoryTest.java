package com.schoolproject.schooladminproject.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.search.MemberSearchCondDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static com.schoolproject.schooladminproject.domain.QBusinessUsedCar.businessUsedCar;
import static com.schoolproject.schooladminproject.domain.QMember.member;
import static org.springframework.util.StringUtils.hasText;

@SpringBootTest
@Transactional
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;
    @PersistenceContext
    EntityManager em;

    private JPAQueryFactory jpaQueryFactory;

    @BeforeEach
    void configure() {
        jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Test
    @DisplayName("")
    void MemberRepositoryTest_2() throws Exception{
        // given
        final List<Member> allEntity = memberRepository.findAllEntity();
        final int size = allEntity.size();
        // when
        System.out.println("size = " + size);
        // then
    }

    @Test
    @DisplayName("")
    void MemberRepositoryTest() throws Exception {
        PageRequest of = PageRequest.of(0, 1);
        memberRepository.findByIdIn(List.of(1L, 2L));
    }

    @Test
    @DisplayName("멤버 검색 동적 쿼리")
    void searchMemberRepositoryTest() throws Exception {
        // given
        final PageRequest of = PageRequest.of(0, 10);
        final MemberSearchCondDto memberSearchCondDto = new MemberSearchCondDto();
//        memberSearchCondDto.setEmail("mreal0@vimeo.com");
        memberSearchCondDto.setEmail("s");
        memberSearchCondDto.setCreatedAt(LocalDateTime.of(2021, 1, 21, 00, 00));
        memberSearchCondDto.setLastCreatedAt(LocalDateTime.of(2021, 1, 30, 00, 00));
        memberSearchCondDto.setIsRecommendMember(true);
        memberSearchCondDto.setIsCared(true);
        memberSearchCondDto.setIsDescription(true);
//        memberSearchCondDto.set
        final QueryResults<Member> memberQueryResults = jpaQueryFactory.selectFrom(member)
                .leftJoin(member.businessUsedCar, businessUsedCar).fetchJoin()
                .where(searchConfEqaulMember(memberSearchCondDto))
                .limit(of.getPageSize())
                .offset(of.getOffset())
                .fetchResults();
        memberQueryResults.getResults().stream()
                .forEach(data ->
                {
                    System.out.println("data = " + data.getName());
                    System.out.println("data.getId() = " + data.getId());
                });
        // when

        // then
    }

    private BooleanBuilder searchConfEqaulMember(MemberSearchCondDto memberSearchCondDto) {
        final BooleanBuilder booleanBuilder = new BooleanBuilder();
        //존재하는 여부 확인 필요
        if (memberSearchCondDto.getIsRecommendMember()) {
            booleanBuilder.and(member.recommendMember.isNotNull());
        }
        if (!memberSearchCondDto.getIsRecommendMember()) {
            booleanBuilder.and(member.recommendMember.isNull());
        }
        // 존재 하는 여부에 따라
//        if (memberSearchCondDto.getIsCared()) {
//            booleanBuilder.and(member.businessUsedCar.isNotEmpty());
//        }
//        if (!memberSearchCondDto.getIsCared()) {
//            booleanBuilder.and(member.businessUsedCar.isEmpty());
//        }
        // 존재 하는 여부에 따라
        if (memberSearchCondDto.getIsDescription()) {
            booleanBuilder.and(member.recommendMember.isNotNull());
        }
        if (!memberSearchCondDto.getIsDescription()) {
            booleanBuilder.and(member.description.isNull());
        }
        if (hasText(memberSearchCondDto.getRecommendMember())) {
            booleanBuilder.and(member.recommendMember.like(memberSearchCondDto.getRecommendMember() + '%'));
        }
        if (hasText(memberSearchCondDto.getEmail())) {
            booleanBuilder.and(member.email.like(memberSearchCondDto.getEmail() + '%'));
        }
        if (hasText(memberSearchCondDto.getName())) {
            booleanBuilder.and(member.name.like(memberSearchCondDto.getName() + '%'));
        }
        if (hasText(memberSearchCondDto.getPhoneNumber())) {
            booleanBuilder.and(member.phoneNumber.like(memberSearchCondDto.getPhoneNumber() + '%'));
        }
        if (hasText(memberSearchCondDto.getUsername())) {
            booleanBuilder.and(member.username.like(memberSearchCondDto.getUsername() + '%'));
        }
        if (hasText(memberSearchCondDto.getModelName())) {
            booleanBuilder.and(businessUsedCar.name.like(memberSearchCondDto.getModelName() + '%'));
        }
        if (memberSearchCondDto.getCreatedAt() != null) {
            booleanBuilder.and(member.createdAt.goe(memberSearchCondDto.getCreatedAt()));
        }
        if (memberSearchCondDto.getLastCreatedAt() != null) {
            booleanBuilder.and(member.createdAt.loe(memberSearchCondDto.getLastCreatedAt()));
        }
        if (memberSearchCondDto.getMemberPremiumClass() != null) {
            booleanBuilder.and(member.memberPremiumClass.eq(memberSearchCondDto.getMemberPremiumClass()));
        }
        if (memberSearchCondDto.getGreaterEqualPoint() != null) {
            booleanBuilder.and(member.point.goe(memberSearchCondDto.getGreaterEqualPoint()));
        }
        if (memberSearchCondDto.getLessEqualPoint() != null) {
            booleanBuilder.and(member.point.loe(memberSearchCondDto.getLessEqualPoint()));
        }
        return booleanBuilder;
    }


}