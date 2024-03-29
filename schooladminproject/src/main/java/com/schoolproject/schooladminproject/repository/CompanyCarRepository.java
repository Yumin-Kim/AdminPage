package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.CompanyCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.repository.search.CompanyCarSearchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyCarRepository extends JpaRepository<CompanyCar,Long> , CompanyCarSearchRepository {
    @Override
    @EntityGraph(attributePaths = {"admin"})
    Page<CompanyCar> findAll(Pageable pageable);

    @Query("select c from CompanyCar c join fetch c.admin")
    List<CompanyCar> findAllEntity();

    @EntityGraph(attributePaths = {"admin"})
    List<CompanyCar> findByIdIn(List<Long> companyCarIdList);
}
