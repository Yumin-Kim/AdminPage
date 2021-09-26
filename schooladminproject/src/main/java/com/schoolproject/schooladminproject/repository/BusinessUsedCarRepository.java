package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessUsedCarRepository extends JpaRepository<BusinessUsedCar,Long> {

    @Query("select b from BusinessUsedCar b left join  b.member m  where m.id in  :memberIdList")
    List<BusinessUsedCar> findContainMemberByIdIn(@Param("memberIdList") List<Long> memberIdList);

}
