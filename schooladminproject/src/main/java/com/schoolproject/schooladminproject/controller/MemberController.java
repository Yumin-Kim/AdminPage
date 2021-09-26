package com.schoolproject.schooladminproject.controller;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.domain.enumtype.MemberPremiumClass;
import com.schoolproject.schooladminproject.dto.CarInfoDto;
import com.schoolproject.schooladminproject.dto.PagingCompanyCarDto;
import com.schoolproject.schooladminproject.dto.PagingMemberDto;
import com.schoolproject.schooladminproject.dto.search.MemberSearchCondDto;
import com.schoolproject.schooladminproject.repository.BusinessUsedCarRepository;
import com.schoolproject.schooladminproject.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Transactional
public class MemberController {

    private final MemberRepository memberRepository;
    private final BusinessUsedCarRepository businessUsedCarRepository;
    /* 회원 목록 제공
     */
    @GetMapping
    public PagingMemberDto getEntity(Model model, Pageable pageable) {
        return getPagingMemberDto(pageable);
    }

    /**
     * 정보 삭제 후 다시 페이징 쿼리 실행하여 정보 전송
     *
     * @param memberIdList
     * @param pageable
     * @return
     */
    @DeleteMapping("/{memberIds}")
    public Object deleteEntity(@PathVariable("memberIds") List<Long> memberIdList, Pageable pageable) {
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
        return getPagingMemberDto(pageable);
    }


    /**
     * 회원 검색 기능
     * TODO 회원 검색 기능중 현재 회원이 등록한 차량의 유무에 따라 동적 쿼리 제공하는 기능 수정
     * @param memberSearchCondDto 회원 정보 조건 dto
     * @param pageable
     * @return
     */
    @PostMapping("/search/v1")
    public Object searchMember(@RequestBody MemberSearchCondDto memberSearchCondDto, Pageable pageable){
        final Page<Member> members = memberRepository.searchV1EqualCondition(pageable, memberSearchCondDto);
        return new PagingMemberDto(members.getContent(), (int) members.getTotalElements(), members.getTotalPages(), members.getSize(), members.getNumber());
    }

    /**/
    @PutMapping
    public PagingMemberDto updateMemberEntity(@RequestBody List<PagingMemberDto.MemberDto> memberDtoList, Pageable pageable) {
        final List<Long> memberIdList = memberDtoList.stream()
                .map(memberDto -> memberDto.getId())
                .collect(toList());
        final List<Member> memberList = memberRepository.findByIdIn(memberIdList);
        for (Member member : memberList) {
            memberDtoList.forEach(memberDto -> {
                if (memberDto.getId() == member.getId()) {
                    member.updateEntity(memberDto);
                }
            });
        }
        return getPagingMemberDto(pageable);

    }

    private PagingMemberDto getPagingMemberDto(Pageable pageable) {
        Page<Member> all = memberRepository.findAll(pageable);
        return new PagingMemberDto(all.getContent(), (int) all.getTotalElements(), all.getTotalPages(), all.getSize(), all.getNumber());
    }


}
