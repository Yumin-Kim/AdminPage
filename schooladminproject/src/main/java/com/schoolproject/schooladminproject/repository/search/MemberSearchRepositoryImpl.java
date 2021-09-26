package com.schoolproject.schooladminproject.repository.search;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.search.MemberSearchCondDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static com.schoolproject.schooladminproject.domain.QBusinessUsedCar.businessUsedCar;
import static com.schoolproject.schooladminproject.domain.QMember.member;
import static org.springframework.util.StringUtils.hasText;

public class MemberSearchRepositoryImpl implements MemberSearchRepository {

    @PersistenceContext
    private EntityManager em;

    private JPAQueryFactory jpaQueryFactory;

    public MemberSearchRepositoryImpl(EntityManager em) {
        jpaQueryFactory =new JPAQueryFactory(em);
    }

    @Override
    public Page<Member> searchV1EqualCondition(Pageable pageable, MemberSearchCondDto memberSearchCondDto) {
        final QueryResults<Member> memberQueryResults = jpaQueryFactory.selectFrom(member)
                .leftJoin(member.businessUsedCar, businessUsedCar).fetchJoin()
                .where(searchConfEqaulMember(memberSearchCondDto))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetchResults();

        return new PageImpl<>(memberQueryResults.getResults(), pageable, memberQueryResults.getTotal());
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
