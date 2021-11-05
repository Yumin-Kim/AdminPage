package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteUserRepository extends JpaRepository<SiteUser , Long> {
    SiteUser findByName(String name);
}
