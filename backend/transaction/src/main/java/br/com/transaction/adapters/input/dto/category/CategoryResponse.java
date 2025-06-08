package br.com.transaction.adapters.input.dto.category;

import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Response DTO for transaction category")
public record CategoryResponse(

        @Schema(description = "Unique identifier of the transaction category", example = "123e4567-e89b-12d3-a456-426614174000")
        UUID id,

        @Schema(description = "Name of the transaction category", example = "Food", maxLength = 60)
        String name,

        @Schema(description = "Type of the transaction category", example = "INPUT", allowableValues = {"INPUT", "OUTPUT"})
        TransactionCategoryTypeEnum type
) {
    public static List<CategoryResponse> fromList(List<TransactionCategory> content) {

        if (content == null || content.isEmpty()) return List.of();

        return content.stream()
                .map(category -> new CategoryResponse(
                        category.getId(),
                        category.getName(),
                        category.getType()
                )).toList();
    }

    public static CategoryResponse fromDomain(TransactionCategory category) {

        if (category == null) return null;

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getType()
        );
    }
}
