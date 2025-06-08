package br.com.transaction.adapters.input.dto.category.create;

import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Schema(description = "Request DTO for creating a new transaction category")
public record CreateCategoryRequest(

        @JsonProperty("name")
        @NotEmpty(message = "Category name must not be empty")
        @Size(max = 60, message = "Category name must not exceed {max} characters")
        @Schema(description = "Name of the transaction category", example = "Food", maxLength = 60)
        String name,

        @JsonProperty("type")
        @NotNull(message = "Category type must not be null")
        @Schema(description = "Type of the transaction category", example = "INPUT", allowableValues = {"INPUT", "OUTPUT"})
        TransactionCategoryTypeEnum type
) {
}