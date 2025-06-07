package br.com.transaction.adapters.input;

import br.com.transaction.adapters.input.dto.transaction.TransactionResponse;
import br.com.transaction.adapters.input.dto.transaction.create.CreateTransactionRequest;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import br.com.transaction.domain.usecase.transaction.create.CreateTransactionUseCase;
import br.com.transaction.domain.usecase.transaction.read.pageable.FindPageableTransactionsUseCase;
import br.com.transaction.globals.PageResponse;
import br.com.transaction.ports.input.TransactionControllerPort;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class TransactionControllerAdapter implements TransactionControllerPort {

    private final CreateTransactionUseCase createTransactionUseCase;
    private final FindPageableTransactionsUseCase findPageableTransactionsUseCase;

    public TransactionControllerAdapter(CreateTransactionUseCase createTransactionUseCase,
                                        FindPageableTransactionsUseCase findPageableTransactionsUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
        this.findPageableTransactionsUseCase = findPageableTransactionsUseCase;
    }

    @Override
    public ResponseEntity<Void> createNewTransaction(CreateTransactionRequest createTransactionRequest) {
        createTransactionUseCase.saveTransaction(createTransactionRequest);
        return ResponseEntity.status(201).build();
    }

    @Override
    public ResponseEntity<PageResponse<TransactionResponse>> findPageableTransactions(Pageable pageable,
                                                                                      Integer month,
                                                                                      Integer year,
                                                                                      TransactionStatusEnum status,
                                                                                      UUID categoryId) {

        PageResponse<TransactionResponse> pageResponse =
                findPageableTransactionsUseCase.findPageableTransaction(
                        pageable,
                        month,
                        year,
                        status,
                        categoryId
                );

        return (pageResponse.getContent().isEmpty())
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(pageResponse);
    }
}