package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {
}
