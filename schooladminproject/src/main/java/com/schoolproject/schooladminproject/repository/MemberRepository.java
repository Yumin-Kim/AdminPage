package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.repository.search.MemberSearchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> , MemberSearchRepository {

    @EntityGraph(attributePaths = {"businessUsedCar"})
    Optional<Member> findJoinBusinessCarById(Long MemberId);

    @Override
    @EntityGraph(attributePaths = {"businessUsedCar"})
    Page<Member> findAll(Pageable pageable);

    List<Member> findByIdIn(List<Long> memberIdLists);

}
