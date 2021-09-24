package com.schoolproject.schooladminproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SchooladminprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchooladminprojectApplication.class, args);
	}

}
