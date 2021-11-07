package com.schoolproject.schooladminproject.controller.user;

import com.schoolproject.schooladminproject.domain.CarKind;
import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import com.schoolproject.schooladminproject.dto.user.BusinessUsedCarDto;
import com.schoolproject.schooladminproject.dto.user.LoginInfo;
import com.schoolproject.schooladminproject.dto.user.RegisterForm;
import com.schoolproject.schooladminproject.exception.MemberFileUploadException;
import com.schoolproject.schooladminproject.service.user.CarInfoCommandService;
import com.schoolproject.schooladminproject.service.user.CarInfoQueryService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@Slf4j
public class CarInfoController {

    private final CarInfoCommandService carInfoCommandService;
    private final CarInfoQueryService carInfoQueryService;

    @ModelAttribute("carKind")
    public CarKind[] carKind() {
        return CarKind.values();
    }

    @ModelAttribute("carFuel")
    public CarFuelType[] carFuels() {
        return CarFuelType.values();
    }

    @ModelAttribute("carTransmissionKind")
    public CarTransmissionKind[] carTransmissionKind() {
        return CarTransmissionKind.values();
    }

    @ModelAttribute("carColors")
    public List<CarColor> carColor() {
        List<CarColor> carColors = new ArrayList<>();
        carColors.add(new CarColor("RED", "빨간색"));
        carColors.add(new CarColor("ORANGE", "오렌지색"));
        carColors.add(new CarColor("YELLOW", "노란색"));
        carColors.add(new CarColor("GREEN", "초록색"));
        carColors.add(new CarColor("BLUE", "파란색"));
        carColors.add(new CarColor("WHITE", "흰색"));
        carColors.add(new CarColor("BLACK", "검은색"));
        carColors.add(new CarColor("ANY", "기타"));
        return carColors;
    }

    @Value("${file.dir}")
    public String baseFirDir;

    // 사용자 차량 등록
    @GetMapping("/register")
    public String registerCarInfo(@AuthenticationPrincipal LoginInfo loginInfo, Model model) {
        model.addAttribute("member", loginInfo.getUsername());
        model.addAttribute("registerForm", new RegisterForm());
        return "user/registerCar";
    }

    @PostMapping("/register")
    public String registerCar(
            @Valid @ModelAttribute RegisterForm carInfo,
            RedirectAttributes redirectAttributes,
            @AuthenticationPrincipal LoginInfo loginInfo,
            BindingResult bindingResult) {
        if (loginInfo != null) {
            final String imageSrc = saveImage(carInfo.getMultipartFile(), loginInfo.getUsername());
            carInfoCommandService.save(loginInfo.getUsername(), carInfo , imageSrc);
        }
        return "redirect:/usercar";
    }


    // 사용자 차량 조회
    @GetMapping("/usercar")
    public String getUserCarInfo(Model model , @AuthenticationPrincipal LoginInfo loginInfo) {
        model.addAttribute("member", loginInfo.getUsername());
        final List<BusinessUsedCarDto> registerCar = carInfoQueryService.findRegisterCar(loginInfo.getUsername());
        model.addAttribute("carInfo", registerCar);
        log.info("{}",registerCar.toString());
        return "user/userCarList";
    }

    // 차량 조회
    @GetMapping("/carinfo")
    public String getCarInfos(Model model , @AuthenticationPrincipal LoginInfo loginInfo) {
        model.addAttribute("member", loginInfo.getUsername());
        return "user/carList";
    }

    @SneakyThrows(MemberFileUploadException.class)
    private String  saveImage(MultipartFile multipartFile, String username) {
        final String originalFilename = multipartFile.getOriginalFilename();
        final int formatImage = originalFilename.lastIndexOf(".");
        final String fileNameFormat = originalFilename.substring(formatImage);
        String baseImageSrc = null;
        try{
            baseImageSrc = LocalDateTime.now()+"_" + fileNameFormat;
            multipartFile.transferTo(new File(baseFirDir + baseImageSrc));
            baseImageSrc = "http://media.seowon.ac.kr/yumin/images/" +  baseImageSrc;
            log.info("저장 완료");
        }catch (IOException e){
            throw new MemberFileUploadException("업로드 에러");
        }
        return baseImageSrc;
    }

}
