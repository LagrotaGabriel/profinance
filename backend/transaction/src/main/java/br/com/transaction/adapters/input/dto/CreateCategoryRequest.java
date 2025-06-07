package br.com.transaction.adapters.input.dto;

import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;

public record CreateCategoryRequest(

        // TODO IMPLEMENT VALIDATION

        String name,
        TransactionCategoryTypeEnum type
) {
}