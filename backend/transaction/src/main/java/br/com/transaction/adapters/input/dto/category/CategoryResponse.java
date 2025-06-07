package br.com.transaction.adapters.input.dto.category;

import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;

import java.util.List;
import java.util.UUID;

public record CategoryResponse(

        UUID id,
        String name,
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
