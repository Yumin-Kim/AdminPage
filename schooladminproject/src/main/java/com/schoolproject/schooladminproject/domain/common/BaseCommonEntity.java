package com.schoolproject.schooladminproject.domain.common;

import com.schoolproject.schooladminproject.domain.common.BaseDateEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter
@Setter(AccessLevel.PROTECTED)
public class BaseCommonEntity extends BaseDateEntity {

    private String password;
    private String address;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private String phoneNumber;

    public BaseCommonEntity( String password) {
        this.password = password;
    }

}
