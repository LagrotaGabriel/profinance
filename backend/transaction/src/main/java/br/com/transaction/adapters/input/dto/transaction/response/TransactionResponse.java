package br.com.transaction.adapters.input.dto.transaction.response;

import br.com.transaction.domain.model.Transaction;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.List;

@Schema(description = "Response DTO for a transaction")
public record TransactionResponse(

        @Schema(description = "Unique identifier of the transaction", example = "74bcd515-655c-4def-8dc8-3329ccbdf62e")
        String id,

        @Schema(description = "Description of the transaction", example = "Payment for invoice #12345", maxLength = 60)
        String description,

        @Schema(description = "Value of the transaction", example = "150.75", minimum = "1", maximum = "999999999")
        BigDecimal value,

        @Schema(description = "Creation timestamp of the transaction", example = "2023-10-01T12:00:00Z")
        String creationTimeStamp,

        @Schema(description = "Expiration date of the transaction", example = "2023-12-31", type = "string", format = "date")
        String expirationDate,

        @Schema(description = "Execution date of the transaction", example = "2023-12-01", type = "string", format = "date")
        String executionDate,

        @Schema(description = "Status of the transaction", example = "PENDING", allowableValues = "PENDING, COMPLETED, CANCELED")
        String status,

        @Schema(description = "ID of the transaction category", example = "74bcd515-655c-4def-8dc8-3329ccbdf62e")
        String categoryId,

        @Schema(description = "Name of the transaction category", example = "Utilities")
        String categoryName
) {

    public static TransactionResponse fromDomain(Transaction transaction) {

        if (transaction == null) return null;

        return new TransactionResponse(
                transaction.getId().toString(),
                transaction.getDescription(),
                transaction.getValue(),
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