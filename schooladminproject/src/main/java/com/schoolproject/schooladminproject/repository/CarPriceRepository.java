package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.CarPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarPriceRepository extends JpaRepository<CarPrice,Long> {
}
