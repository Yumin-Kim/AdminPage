package com.schoolproject.schooladminproject.repository.search;

import com.schoolproject.schooladminproject.domain.CompanyCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.search.CompanyCarSearchDto;
import com.schoolproject.schooladminproject.dto.search.MemberSearchCondDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompanyCarSearchRepository {
    Page<CompanyCar> searchV1EqualCondition(Pageable pageable, CompanyCarSearchDto companyCarSearchDto);
    List<CompanyCar> searchV2EqualConditionNotPaging( CompanyCarSearchDto companyCarSearchDto);
}
