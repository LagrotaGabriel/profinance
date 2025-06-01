package br.com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(
        scanBasePackages = {
                "br.com.transaction"
        }
)
@EnableJpaRepositories(
        basePackages = {
                "br.com.transaction.adapters.output.repository"
        }
)
@EntityScan(
        basePackages = {
                "br.com.transaction.adapters.output.entity"
        }
)
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }
}