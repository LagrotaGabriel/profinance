package br.com.transaction.adapters.input.dto.transaction.create;

import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Schema(description = "Request DTO for creating a transaction")
public record CreateTransactionRequest(

        @NotEmpty(message = "Description cannot be empty")
        @Size(max = 60, message = "Description must not exceed 60 characters")
        @Schema(description = "Description of the transaction", example = "Payment for invoice #12345", maxLength = 60)
        String description,

        @NotNull(message = "Value cannot be empty")
        @Min(value = 1, message = "Value must be greater than zero")
        @Max(value = 999999999, message = "Value must not exceed 999,999,999")
        @Schema(description = "Value of the transaction", example = "150.75", minimum = "1", maximum = "999999999")
        BigDecimal value,

        @NotNull(message = "Expiration date cannot be empty")
        @Schema(description = "Expiration date of the transaction", example = "2023-12-31", type = "string", format = "date")
        LocalDate expirationDate,

        @Schema(description = "Execution date of the transaction", example = "2023-12-01", type = "string", format = "date")
        LocalDate executionDate,

        @NotNull(message = "Status cannot be empty")
        @Schema(description = "Status of the transaction", example = "PENDING", allowableValues = "PENDING, COMPLETED, CANCELED")
        TransactionStatusEnum status,

        @NotNull(message = "Category ID cannot be empty")
        @Schema(description = "ID of the transaction category", example = "74bcd515-655c-4def-8dc8-3329ccbdf62e")
        UUID categoryId
) {
}