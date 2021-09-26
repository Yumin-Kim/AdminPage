package com.schoolproject.schooladminproject.repository.search;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.schoolproject.schooladminproject.domain.CompanyCar;
import com.schoolproject.schooladminproject.dto.search.CompanyCarSearchDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static com.schoolproject.schooladminproject.domain.QAdmin.admin;
import static com.schoolproject.schooladminproject.domain.QCompanyCar.companyCar;
import static org.springframework.util.StringUtils.hasText;

public class CompanyCarSearchRepositoryImpl implements CompanyCarSearchRepository{

    @PersistenceContext
    EntityManager em;

    JPAQueryFactory jpaQueryFactory;

    public CompanyCarSearchRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<CompanyCar> searchV1EqualCondition(Pageable pageable, CompanyCarSearchDto companyCarSearchDto) {
        final QueryResults<CompanyCar> companyCarQueryResults = jpaQueryFactory.selectFrom(companyCar)
                .join(companyCar.admin, admin).fetchJoin()
                .where(searchCondV1(companyCarSearchDto))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl<>(companyCarQueryResults.getResults(), pageable, companyCarQueryResults.getTotal());
    }

    private BooleanBuilder searchCondV1(CompanyCarSearchDto companyCarSearchDto){
        final BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (hasText(companyCarSearchDto.getColor())) {
            booleanBuilder.and(companyCar.color.like(companyCarSearchDto.getColor() + "%"));
        }
        if (hasText(companyCarSearchDto.getName())) {
            booleanBuilder.and(companyCar.color.like(companyCarSearchDto.getName() + "%"));
        }
        if (hasText(companyCarSearchDto.getModelOption())) {
            booleanBuilder.and(companyCar.color.like(companyCarSearchDto.getModelOption() + "%"));
        }
        if (hasText(companyCarSearchDto.getRegisterAdminName())) {
            booleanBuilder.and(admin.name.like(companyCarSearchDto.getRegisterAdminName() + "%"));
        }
        if (companyCarSearchDto.getCarTransmissionKind() != null) {
            booleanBuilder.and(companyCar.carTransmissionKind.eq(companyCarSearchDto.getCarTransmissionKind()));
        }
        if (companyCarSearchDto.getCreatedModelYear()!=null && companyCarSearchDto.getLastedModelYear()!=null) {
            booleanBuilder.and(companyCar.modelYear.between(companyCarSearchDto.getCreatedModelYear(),companyCarSearchDto.getLastedModelYear()));
        }
        if (companyCarSearchDto.getCreatedModelYear() != null || companyCarSearchDto.getLastedModelYear() != null) {
            if (companyCarSearchDto.getCreatedModelYear() !=null) {
                booleanBuilder.and(companyCar.modelYear.goe(companyCarSearchDto.getCreatedModelYear()));
            }
            if (companyCarSearchDto.getLastedModelYear() != null) {
                booleanBuilder.and(companyCar.modelYear.loe(companyCarSearchDto.getCreatedModelYear()));
            }
        }
        if (companyCarSearchDto.getGreaterEqualDistance() != null) {
            booleanBuilder.and(companyCar.distance.eq(companyCarSearchDto.getGreaterEqualDistance()));
        }
        if (companyCarSearchDto.getFuel() != null) {
            booleanBuilder.and(companyCar.fuel.eq(companyCarSearchDto.getFuel()));
        }
        if (companyCarSearchDto.getPassengers() != null) {
            booleanBuilder.and(companyCar.passengers.eq(companyCarSearchDto.getPassengers()));
        }
        if (companyCarSearchDto.getGreaterEqualPrice() != null && companyCarSearchDto.getLessEqualPrice() != null) {
            booleanBuilder.and(companyCar.price.between(companyCarSearchDto.getGreaterEqualPrice(), companyCarSearchDto.getLessEqualPrice()));
        }
        if (companyCarSearchDto.getGreaterEqualPrice() != null || companyCarSearchDto.getLessEqualPrice() != null) {
            if (companyCarSearchDto.getGreaterEqualPrice() != null) {
                booleanBuilder.and(companyCar.price.goe(companyCarSearchDto.getGreaterEqualPrice()));
            }
            if (companyCarSearchDto.getLessEqualPrice() != null) {
                booleanBuilder.and(companyCar.price.loe(companyCarSearchDto.getLessEqualPrice()));
            }
        }
        if (companyCarSearchDto.getCreatedAt() != null && companyCarSearchDto.getLastCreatedAt() != null) {
            booleanBuilder.and(companyCar.createdAt.between(companyCarSearchDto.getCreatedAt(), companyCarSearchDto.getCreatedAt()));
        }
        if (companyCarSearchDto.getCreatedAt() != null || companyCarSearchDto.getLastCreatedAt() != null) {
            if (companyCarSearchDto.getCreatedAt() != null) {
                booleanBuilder.and(companyCar.createdAt.goe(companyCarSearchDto.getCreatedAt()));
            }
            if (companyCarSearchDto.getLastCreatedAt() != null) {
                booleanBuilder.and(companyCar.createdAt.loe(companyCarSearchDto.getLastCreatedAt()));
            }
        }
        if (companyCarSearchDto.getIsImageSrc()) {
            booleanBuilder.and(companyCar.imageSrc.isNotNull());
        }
        if (!companyCarSearchDto.getIsImageSrc()) {
            booleanBuilder.and(companyCar.imageSrc.isNull());
        }
        return booleanBuilder;
    }
}
