package br.com.transaction.adapters.input.dto.transaction;

import br.com.transaction.domain.model.Transaction;

import java.util.List;

public record TransactionResponse(
        String id,
        String description,
        String value,
        String creationTimeStamp,
        String expirationDate,
        String executionDate,
        String status,
        String categoryId,
        String categoryName
) {

    public static TransactionResponse fromDomain(Transaction transaction) {

        if (transaction == null) return null;

        return new TransactionResponse(
                transaction.getId().toString(),
                transaction.getDescription(),
                transaction.getValue().toString(),
                transaction.getCreationTimeStamp().toString(),
                (transaction.getExpirationDate() != null)
                        ? transaction.getExpirationDate().toString()
                        : null,
                (transaction.getExecutionDate() != null)
                        ? transaction.getExecutionDate().toString()
                        : null,
                transaction.getStatus().name(),
                (transaction.getCategory() != null)
                        ? transaction.getCategory().getId().toString()
                        : null,
                (transaction.getCategory() != null)
                        ? transaction.getCategory().getName()
                        : null
        );
    }

    public static List<TransactionResponse> fromList(List<Transaction> content) {
        return content.stream()
                .map(TransactionResponse::fromDomain)
                .toList();
    }
}