package com.schoolproject.schooladminproject.service.user;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.dto.user.RegisterForm;
import com.schoolproject.schooladminproject.exception.MemberRegisterException;
import com.schoolproject.schooladminproject.repository.BusinessUsedCarRepository;
import com.schoolproject.schooladminproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CarInfoCommandService {

    private final BusinessUsedCarRepository businessUsedCarRepository;
    private final MemberRepository memberRepository;

    public void save(String username, RegisterForm carInfo, String imageSrc) {
        final Member member = memberRepository.findByName(username)
                .orElseThrow(() -> new MemberRegisterException("Not Found"));
        BusinessUsedCar businessUsedCar =  carInfo.toEntity(carInfo,imageSrc);
        businessUsedCar.addMember(member);
        businessUsedCarRepository.save(businessUsedCar);
    }
}
