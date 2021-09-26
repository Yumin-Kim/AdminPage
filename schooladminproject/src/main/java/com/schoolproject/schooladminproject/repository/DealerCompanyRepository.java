package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.DealerCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealerCompanyRepository extends JpaRepository<DealerCompany,Long> {
}
