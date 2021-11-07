package com.schoolproject.schooladminproject.service.user;

import com.schoolproject.schooladminproject.domain.Member;
import com.schoolproject.schooladminproject.domain.SiteUser;
import com.schoolproject.schooladminproject.dto.SiteUserRes;
import com.schoolproject.schooladminproject.dto.user.LoginInfo;
import com.schoolproject.schooladminproject.dto.user.UserDto;
import com.schoolproject.schooladminproject.repository.MemberRepository;
import com.schoolproject.schooladminproject.repository.SiteUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final SiteUserRepository siteUserRepository;

    @Transactional
    public Long save(UserDto userDto) {
        final Member entity = Member.createEntity(userDto.getName(), passwordEncoder.encode(userDto.getPassword()), userDto.getEmail(), userDto.getAuth());
        return memberRepository.save(entity).getId();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
        return new LoginInfo(findMember);
    }
}
