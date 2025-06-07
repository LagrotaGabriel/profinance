package br.com.transaction.ports.input;

import br.com.transaction.adapters.input.dto.transaction.TransactionResponse;
import br.com.transaction.adapters.input.dto.transaction.create.CreateTransactionRequest;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import br.com.transaction.globals.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
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

    // TODO ADD API ERROR RESPONSES

    @PostMapping
    @Operation(summary = "Creates a new transaction")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transaction created successfully",
                    content = {@Content(mediaType = "application/json")}),
    })
    ResponseEntity<Void> createNewTransaction(
            @Valid @RequestBody CreateTransactionRequest createTransactionRequest
    );

    @GetMapping
    @Operation(summary = "Finds pageable transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transactions found successfully",
                    content = {@Content(mediaType = "application/json")}),
    })
    ResponseEntity<PageResponse<TransactionResponse>> findPageableTransactions(
            @PageableDefault(size = 20) Pageable pageable,
            @RequestParam(value = "month") Integer month,
            @RequestParam(value = "year") Integer year,
            @RequestParam(value = "status", required = false) TransactionStatusEnum status,
            @RequestParam(value = "categoryId", required = false) UUID categoryId
    );
}