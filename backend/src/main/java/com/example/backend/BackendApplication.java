package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.example", "com.start.ecommerce"})
@ComponentScan(basePackages = {"com.example", "com.start.ecommerce"})  // Add ComponentScan for all required packages
@EnableJpaRepositories(basePackages = {"com.example", "com.start.ecommerce.common"})  // Enable JPA repositories in the correct package

public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
