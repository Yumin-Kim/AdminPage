package com.schoolproject.schooladminproject.service.user;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.user.BusinessUsedCarDto;
import com.schoolproject.schooladminproject.exception.MemberException;
import com.schoolproject.schooladminproject.repository.BusinessUsedCarRepository;
import com.schoolproject.schooladminproject.repository.MemberRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CarInfoQueryService {
    private final BusinessUsedCarRepository businessUsedCarRepository;
    private final MemberRepository memberRepository;

    public List<BusinessUsedCarDto> findRegisterCar(String username) {
        List<BusinessUsedCarDto> result = new ArrayList<>();
        final Member findMember = memberRepository.findByName(username).orElseThrow(() -> new IllegalStateException("Not Found"));
        final Member joinBusinessCar = memberRepository.findJoinBusinessCar(findMember.getId());
        if (joinBusinessCar == null) {
            throw new MemberException("회원의 정보가 존재하지 않습니다.");
        } else {
            result = joinBusinessCar.getBusinessUsedCar().stream()
                    .map(businessUsedCar -> new BusinessUsedCarDto(businessUsedCar))
                    .collect(Collectors.toList());
        }
        return result;
    }

}
