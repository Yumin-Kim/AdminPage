package com.schoolproject.schooladminproject.controller.admin;

import com.schoolproject.schooladminproject.domain.Admin;
import com.schoolproject.schooladminproject.domain.CompanyCar;
import com.schoolproject.schooladminproject.dto.CompanyCarCreateDto;
import com.schoolproject.schooladminproject.dto.PagingCompanyCarDto;
import com.schoolproject.schooladminproject.dto.search.CompanyCarSearchDto;
import com.schoolproject.schooladminproject.repository.AdminRepository;
import com.schoolproject.schooladminproject.repository.CompanyCarRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.util.StringUtils.hasText;

//보유 현황 관련 controller 회사에서 보유하고 있는 차량의 정보 만을 수정할 수 있다.
@RestController
@Transactional
@RequestMapping("/company/api")
@RequiredArgsConstructor
public class CompanyCarController {
    private final AdminRepository adminRepository;
    private final CompanyCarRepository companyCarRepository;
    //차량 등록 기능
    @PostMapping
    public String createCompanyCar(@RequestBody CompanyCarCreateDto companyCarCreateDto) {
        final Admin admin = adminRepository.findById(companyCarCreateDto.getAdminId()).get();
        CompanyCar companyCar = CompanyCar.createEntity(companyCarCreateDto, admin);
        return "success";
    }

    //차량 조회
    @GetMapping
    public Object getCompanyCar(Pageable pageable) {
        return getAllCompanyCarEntity(companyCarRepository.findAllEntity());
    }

    //차량 정보 수정
    @PutMapping
    public PagingCompanyCarDto updateCompany(@RequestBody List<PagingCompanyCarDto.CompanyCarDto> companyCarDtoList, Pageable pageable) {
        final List<Long> collect = companyCarDtoList.stream()
                .map(companyCarDto -> companyCarDto.getId())
                .collect(Collectors.toList());
        List<CompanyCar> companyCarList = companyCarRepository.findByIdIn(collect);
        for (CompanyCar companyCar : companyCarList) {
            for (PagingCompanyCarDto.CompanyCarDto companyCarDto : companyCarDtoList) {
                if (companyCarDto.getId() == companyCar.getId()) {
                    if (hasText(companyCarDto.getRegisterAdminName())) {
                        final Admin admin = adminRepository.findByName(companyCarDto.getRegisterAdminName()).orElseThrow(() -> new RuntimeException("존재하지 않는 관리자 입니다"));
                        companyCar.updateEntity(companyCarDto, admin);
                    } else {
                        companyCar.updateEntity(companyCarDto);
                    }
                }
            }
        }
        return getPagingCompanyCarDto(pageable);
    }

    //차량 정보 삭제
    @DeleteMapping("/{companyIdList}")
    public Object deleteCompanyCarDto(@PathVariable("companyIdList")List<Long> companyIdList, Pageable pageable){
        companyCarRepository.findByIdIn(companyIdList)
                        .forEach(companyCar -> companyCarRepository.delete(companyCar));
        return getAllCompanyCarEntity(companyCarRepository.findAllEntity());
    }

    private Object getAllCompanyCarEntity(List<CompanyCar> allEntity2) {
        final List<CompanyCar> allEntity = allEntity2;
        final List<PagingCompanyCarDto.CompanyCarDto> collect = allEntity.stream()
                .map(companyCar -> new PagingCompanyCarDto.CompanyCarDto(companyCar))
                .collect(Collectors.toList());
        final Map<String, List<PagingCompanyCarDto.CompanyCarDto>> stringListMap = new HashMap<>();
        stringListMap.put("data", collect);
        return stringListMap;
    }

    @PostMapping("/search/v1")
    public PagingCompanyCarDto searchCompanyCar(@RequestBody CompanyCarSearchDto companyCarSearchDto, Pageable pageable) {
        System.out.println("companyCarSearchDto = " + companyCarSearchDto);
        final Page<CompanyCar> companyCars = companyCarRepository.searchV1EqualCondition(pageable, companyCarSearchDto);
        final List<PagingCompanyCarDto.CompanyCarDto> companyCarDtoList = companyCars.getContent().stream()
                .map(companyCar -> new PagingCompanyCarDto.CompanyCarDto(companyCar))
                .collect(Collectors.toList());
        return new PagingCompanyCarDto(companyCarDtoList, (int) companyCars.getTotalElements(), companyCars.getSize(), companyCars.getNumber(), companyCars.getTotalPages());
    }

    @PostMapping("/search/v2")
    public Object searchCompanyCarNotPaging(@RequestBody CompanyCarSearchDto companyCarSearchDto) {
        return getAllCompanyCarEntity(companyCarRepository.searchV2EqualConditionNotPaging(companyCarSearchDto));
    }


    private PagingCompanyCarDto getPagingCompanyCarDto(Pageable pageable) {
        final Page<CompanyCar> all = companyCarRepository.findAll(pageable);
        final List<PagingCompanyCarDto.CompanyCarDto> collect = all.getContent().stream()
                .map(companyCar -> new PagingCompanyCarDto.CompanyCarDto(companyCar))
                .collect(Collectors.toList());
        return new PagingCompanyCarDto(collect, (int) all.getTotalElements(), all.getSize(), all.getNumber(), all.getTotalPages());
    }

    @ExceptionHandler({RuntimeException.class})
    public String exceptionHandler(Exception e) {
        return e.getMessage();
    }
}
