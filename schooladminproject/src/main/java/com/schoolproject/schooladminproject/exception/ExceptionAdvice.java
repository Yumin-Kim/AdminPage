package com.schoolproject.schooladminproject.exception;

import com.schoolproject.schooladminproject.controller.user.CarColor;
import com.schoolproject.schooladminproject.domain.CarKind;
import com.schoolproject.schooladminproject.domain.enumtype.CarFuelType;
import com.schoolproject.schooladminproject.domain.enumtype.CarTransmissionKind;
import com.schoolproject.schooladminproject.dto.user.LoginInfo;
import com.schoolproject.schooladminproject.dto.user.RegisterForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.*;

@ControllerAdvice
@Slf4j
public class ExceptionAdvice {
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

    @ExceptionHandler({MemberException.class})
    public String memberErrorPage(@AuthenticationPrincipal LoginInfo loginInfo, Exception e, Model model) {
        model.addAttribute("error", e.getMessage());
        model.addAttribute("member", loginInfo.getUsername());
        return "user/error";
    }

    @ExceptionHandler({MemberRegisterException.class, MemberFileUploadException.class})
    public String memberRegisterErrorPage(@AuthenticationPrincipal LoginInfo loginInfo, Exception e, Model model) {
        model.addAttribute("error", e.getMessage());
        return "user/registerError";
    }

    @ExceptionHandler({BindException.class})
    public String validationException(@AuthenticationPrincipal LoginInfo loginInfo,Model model , BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            final Map<String, List<String>> collect = bindingResult.getFieldErrors().stream()
                    .collect(
                            groupingBy(f -> f.getField(), mapping(fieldError -> fieldError.getDefaultMessage(), toList()))
                    );
            log.error("{}", collect);
            model.addAttribute("member", loginInfo.getUsername());
            model.addAttribute("error", "차량 등록간 폼 입력 에러");
            model.addAttribute("registerForm", new RegisterForm());
            model.addAttribute("validation", collect);
        }
        return "user/registerError";
    }
}
