package com.schoolproject.schooladminproject.repository.search;

import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.search.MemberSearchCondDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberSearchRepository {

    Page<Member> searchV1EqualCondition(Pageable pageable, MemberSearchCondDto memberSearchCondDto);

}
