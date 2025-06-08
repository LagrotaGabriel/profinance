package br.com.transaction.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Transaction API",
                version = "v1",
                description = "API to manage transactions, including creation, retrieval, and processing of transaction data.",
                contact = @Contact(name = "Gabriel Henrique Afonso Cruz Lagrota", email = "gabriellagrota23@gmail.com")
        )
)
public class SwaggerConfiguration {

    @Bean
    public GroupedOpenApi transactionGroup() {
        return GroupedOpenApi.builder()
                .group("transactions")
                .displayName("Transactions")
                .pathsToMatch("/profinance/api/v1/transaction/**")
                .build();
    }

    @Bean
    public GroupedOpenApi categoryGroup() {
        return GroupedOpenApi.builder()
                .group("categories")
                .displayName("Categories")
                .pathsToMatch("/profinance/api/v1/category/**")
                .build();
    }
}