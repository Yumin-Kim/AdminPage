package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
}
