package br.com.transaction.ports.input;

import br.com.transaction.adapters.exception.models.StandardError;
import br.com.transaction.adapters.input.dto.transaction.request.TransactionRequest;
import br.com.transaction.adapters.input.dto.transaction.response.TransactionResponse;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import br.com.transaction.globals.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Transaction management")
@RequestMapping("/profinance/api/v1/transaction")
public interface TransactionControllerPort {

    @PostMapping
    @Operation(summary = "Creates a new transaction")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transaction created successfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Invalid request",
                    content = {@Content(mediaType = "application/json")})
    })
    ResponseEntity<Void> createNewTransaction(
            @Valid @RequestBody TransactionRequest transactionRequest
    );

    @GetMapping
    @Operation(summary = "Finds pageable transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transactions found successfully",
                    content = {@Content(mediaType = "application/json")})
    })
    ResponseEntity<PageResponse<TransactionResponse>> findPageableTransactions(
            @PageableDefault(size = 20) Pageable pageable,
            @RequestParam(value = "month") Integer month,
            @RequestParam(value = "year") Integer year,
            @RequestParam(value = "status", required = false) TransactionStatusEnum status,
            @RequestParam(value = "categoryId", required = false) UUID categoryId
    );

    @GetMapping("/{id}")
    @Operation(summary = "Finds transaction by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transaction found successfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "Transaction not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = StandardError.class))})
    })
    ResponseEntity<TransactionResponse> findTransactionById(
            @PathVariable(value = "id") UUID id
    );

    @PutMapping("/{id}")
    @Operation(summary = "Updates an existing transaction")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Transaction updated successfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "Transaction not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = StandardError.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request",
                    content = {@Content(mediaType = "application/json")})
    })
    ResponseEntity<Void> updateTransaction(
            @PathVariable(value = "id") UUID id,
            @RequestBody @Valid TransactionRequest transactionRequest
    );

    @DeleteMapping("/{id}")
    @Operation(summary = "Updates an existing transaction")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Transaction deleted successfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "Transaction not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = StandardError.class))})
    })
    ResponseEntity<Void> deleteTransaction(
            @PathVariable(value = "id") UUID id
    );
}