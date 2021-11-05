package com.schoolproject.schooladminproject.controller.admin;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.PagingMemberDto;
import com.schoolproject.schooladminproject.dto.search.MemberSearchCondDto;
import com.schoolproject.schooladminproject.repository.BusinessUsedCarRepository;
import com.schoolproject.schooladminproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Controller
@RequestMapping("/member")
@RequiredArgsConstructor
@Transactional
public class MemberController {

    private final MemberRepository memberRepository;
    private final BusinessUsedCarRepository businessUsedCarRepository;

    /* 회원 목록 제공
     */
    @GetMapping
    public String getEntity(Model model, Pageable pageable) {
        List<Member> all = memberRepository.findAllEntity();
        final List<PagingMemberDto.MemberDto> collect = all.stream()
                .map(member -> new PagingMemberDto.MemberDto(member))
                .collect(toList());
        model.addAttribute("memberList", collect);
        return "memberlist";
    }



    /**
     * 회원 검색 기능
     * TODO 회원 검색 기능중 현재 회원이 등록한 차량의 유무에 따라 동적 쿼리 제공하는 기능 수정
     *
     * @param memberSearchCondDto 회원 정보 조건 dto
     * @param pageable
     * @return
     */
//    @PostMapping("/search/v1")
//    public Object searchMember(@RequestBody MemberSearchCondDto memberSearchCondDto, Pageable pageable) {
//        final Page<Member> members = memberRepository.searchV1EqualCondition(pageable, memberSearchCondDto);
//        return new PagingMemberDto(members.getContent(), (int) members.getTotalElements(), members.getTotalPages(), members.getSize(), members.getNumber());
//    }

    /**/
    @PutMapping
    public PagingMemberDto updateMemberEntity(Model model ,@RequestBody List<PagingMemberDto.MemberDto> memberDtoList, Pageable pageable) {
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
        return getPagingMemberDto(pageable, model);

    }

    private PagingMemberDto getPagingMemberDto(Pageable pageable, Model model) {
        Page<Member> all = memberRepository.findAll(pageable);
        final PagingMemberDto pagingMemberDto = new PagingMemberDto(all.getContent(), (int) all.getTotalElements(), all.getTotalPages(), all.getSize(), all.getNumber());
        model.addAttribute("paging", pagingMemberDto);
        model.addAttribute("memberList", all.getContent());
        return null;
    }


}
