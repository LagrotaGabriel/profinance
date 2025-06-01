package br.com.transaction.ports.input;

import br.com.transaction.adapters.input.dto.CreateTransactionRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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
}