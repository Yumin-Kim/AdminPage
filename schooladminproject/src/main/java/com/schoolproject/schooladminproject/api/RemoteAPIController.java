package com.schoolproject.schooladminproject.api;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.CompanyCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.PagingCompanyCarDto;
import com.schoolproject.schooladminproject.dto.PagingMemberDto;
import com.schoolproject.schooladminproject.dto.search.CompanyCarSearchDto;
import com.schoolproject.schooladminproject.dto.search.MemberSearchCondDto;
import com.schoolproject.schooladminproject.repository.BusinessUsedCarRepository;
import com.schoolproject.schooladminproject.repository.CompanyCarRepository;
import com.schoolproject.schooladminproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Transactional
@RequiredArgsConstructor

public class RemoteAPIController {

    private final BusinessUsedCarRepository businessUsedCarRepository;
    private final MemberRepository memberRepository;
    private final CompanyCarRepository companyCarRepository;

    /**
     * 정보 삭제 후 다시 페이징 쿼리 실행하여 정보 전송
     *
     * @param memberIdList
     * @param pageable
     * @return
     */
    @DeleteMapping("/member/{memberIds}")
    public Object deleteEntity(Model model, @PathVariable("memberIds") List<Long> memberIdList, Pageable pageable) {
        final List<Member> members = memberRepository.findByIdIn(memberIdList);
        final List<BusinessUsedCar> memberRegisteredCarInfoList = businessUsedCarRepository.findContainMemberByIdIn(memberIdList);
        for (Member member : members) {
            memberRegisteredCarInfoList.forEach(businessUsedCar -> {
                if (businessUsedCar.getMember().getId() == member.getId()) {
                    businessUsedCarRepository.delete(businessUsedCar);
                }
            });
            memberRepository.delete(member);
        }
        Page<Member> all = memberRepository.findAll(pageable);
        return new PagingMemberDto(all.getContent(), (int) all.getTotalElements(), all.getTotalPages(), all.getSize(), all.getNumber());
    }

    @PostMapping("/member/search/v1")
    public Object searchV1MemberPaging(@RequestBody MemberSearchCondDto memberSearchCondDto, Pageable pageable) {
        final Page<Member> members = memberRepository.searchV1EqualCondition(pageable, memberSearchCondDto);
        return new PagingMemberDto(members.getContent(), (int) members.getTotalElements(), members.getTotalPages(), members.getSize(), members.getNumber());
    }

    @PostMapping("/member/search/v2")
    public Object searchV2MemberNotPaging(@RequestBody MemberSearchCondDto memberSearchCondDto) {
        final List<Member> members = memberRepository.searchV2EqualConditionNotPaging(memberSearchCondDto);
        return members.stream()
                .map(member -> new PagingMemberDto.MemberDto(member))
                .collect(Collectors.toList());
    }



}
