package com.schoolproject.schooladminproject.repository;

import com.schoolproject.schooladminproject.domain.BusinessUsedCar;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class BusinessUsedCarRepositoryTest {

    @Autowired
    BusinessUsedCarRepository businessUsedCarRepository;

    @Test
    @DisplayName("")
    void BusinessUsedCarRepositoryTest() throws Exception{
        // given
        final List<BusinessUsedCar> containMemberByIdIn = businessUsedCarRepository.findContainMemberByIdIn(List.of(1L, 2L));
        final int size = containMemberByIdIn.size();
        System.out.println("size = " + size);
        containMemberByIdIn.forEach(businessUsedCar -> {
            System.out.println("businessUsedCar.getMember().getId() = " + businessUsedCar.getMember().getId());
        });

    }

}