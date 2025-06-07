package br.com.transaction.adapters.input.dto.transaction.create;

import br.com.transaction.domain.model.enums.TransactionStatusEnum;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record CreateTransactionRequest(

        // TODO IMPL ATTRIBUTES VALIDATION

        String description,
        BigDecimal value,
        LocalDate expirationDate,
        LocalDate executionDate,
        TransactionStatusEnum status,
        UUID categoryId
) {
}