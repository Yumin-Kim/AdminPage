package com.schoolproject.schooladminproject.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.schoolproject.schooladminproject.domain.CompanyCar;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import com.schoolproject.schooladminproject.dto.search.CompanyCarSearchDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static com.schoolproject.schooladminproject.domain.QAdmin.admin;
import static com.schoolproject.schooladminproject.domain.QCompanyCar.companyCar;
import static org.springframework.util.StringUtils.hasText;

@SpringBootTest
@Transactional
class CompanyCarRepositoryTest {

    @Autowired
    EntityManager em;
    @Autowired
    CompanyCarRepository companyCarRepository;

    JPAQueryFactory jpaQueryFactory;

    @BeforeEach
    void configure() {
        jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Test
    @DisplayName("")
    void CompanyCarRepositoryTest() throws Exception {
        // given
        final CompanyCarSearchDto companyCarSearchDto = new CompanyCarSearchDto();
        final PageRequest of = PageRequest.of(0, 10);
        companyCarSearchDto.setColor("Teal");
        companyCarSearchDto.setCarTransmissionKind(CarTransmissionKind.AUTOMATIC);
        companyCarSearchDto.setIsImageSrc(true);
        final QueryResults<CompanyCar> companyCarQueryResults = jpaQueryFactory.selectFrom(companyCar)
                .join(companyCar.admin, admin).fetchJoin()
                .where(searchCondV1(companyCarSearchDto))
                .offset(of.getOffset())
                .limit(of.getPageSize())
                .fetchResults();
        final int size = companyCarQueryResults.getResults().size();
        System.out.println("size = " + size);
        companyCarQueryResults.getResults().stream()
                .forEach(data-> {
                    System.out.println("data.getName() = " + data.getName());
                    System.out.println("data.getId() = " + data.getId());
                    System.out.println("data.getColor() = " + data.getColor());
                });
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
        if (companyCarSearchDto.getGreaterEqualDistance() != null) {
            booleanBuilder.and(companyCar.distance.eq(companyCarSearchDto.getGreaterEqualDistance()));
        }
        if (companyCarSearchDto.getFuel() != null) {
            booleanBuilder.and(companyCar.fuel.eq(companyCarSearchDto.getFuel()));
        }
        if (companyCarSearchDto.getPassengers() != null) {
            booleanBuilder.and(companyCar.passengers.eq(companyCarSearchDto.getPassengers()));
        }
        if (companyCarSearchDto.getGreaterEqualPrice() != null) {
            booleanBuilder.and(companyCar.price.goe(companyCarSearchDto.getGreaterEqualPrice()));
        }
        if (companyCarSearchDto.getLessEqualPrice() != null) {
            booleanBuilder.and(companyCar.price.loe(companyCarSearchDto.getLessEqualPrice()));
        }
        if (companyCarSearchDto.getCreatedAt() != null) {
            booleanBuilder.and(companyCar.createdAt.goe(companyCarSearchDto.getCreatedAt()));
        }
        if (companyCarSearchDto.getLastCreatedAt() != null) {
            booleanBuilder.and(companyCar.createdAt.loe(companyCarSearchDto.getLastCreatedAt()));
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