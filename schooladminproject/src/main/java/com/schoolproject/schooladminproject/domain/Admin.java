package com.schoolproject.schooladminproject.domain;

import com.schoolproject.schooladminproject.domain.common.BaseCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Admin extends BaseCommonEntity {
    @Id
    @GeneratedValue
    @Column(name = "admin_id")
    private Long id;
    private String name;
    @OneToMany(mappedBy = "admin")
    private List<CompanyCar> companyCars = new ArrayList<>();

    protected Admin(String password) {
        super(password);
    }
}
