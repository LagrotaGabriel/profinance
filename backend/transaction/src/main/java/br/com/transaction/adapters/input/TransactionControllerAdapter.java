package br.com.transaction.adapters.input;

import br.com.transaction.adapters.input.dto.transaction.request.TransactionRequest;
import br.com.transaction.adapters.input.dto.transaction.response.TransactionResponse;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import br.com.transaction.domain.usecase.transaction.create.CreateTransactionUseCase;
import br.com.transaction.domain.usecase.transaction.delete.DeleteTransactionUseCase;
import br.com.transaction.domain.usecase.transaction.read.id.FindTransactionByIdUseCase;
import br.com.transaction.domain.usecase.transaction.read.pageable.FindPageableTransactionsUseCase;
import br.com.transaction.domain.usecase.transaction.update.UpdateTransactionUseCase;
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
    private final FindTransactionByIdUseCase findTransactionByIdUseCase;
    private final UpdateTransactionUseCase updateTransactionUseCase;
    private final DeleteTransactionUseCase deleteTransactionUseCase;

    public TransactionControllerAdapter(CreateTransactionUseCase createTransactionUseCase,
                                        FindPageableTransactionsUseCase findPageableTransactionsUseCase,
                                        FindTransactionByIdUseCase findTransactionByIdUseCase,
                                        UpdateTransactionUseCase updateTransactionUseCase,
                                        DeleteTransactionUseCase deleteTransactionUseCase) {

        this.createTransactionUseCase = createTransactionUseCase;
        this.findPageableTransactionsUseCase = findPageableTransactionsUseCase;
        this.findTransactionByIdUseCase = findTransactionByIdUseCase;
        this.updateTransactionUseCase = updateTransactionUseCase;
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }

    @Override
    public ResponseEntity<Void> createNewTransaction(TransactionRequest transactionRequest) {
        createTransactionUseCase.saveTransaction(transactionRequest);
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

    @Override
    public ResponseEntity<TransactionResponse> findTransactionById(UUID id) {

        TransactionResponse transactionResponse = findTransactionByIdUseCase.findTransactionById(id);

        return (transactionResponse == null)
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(transactionResponse);
    }

    @Override
    public ResponseEntity<Void> updateTransaction(UUID id,
                                                  TransactionRequest transactionRequest) {

        updateTransactionUseCase.updateTransaction(id, transactionRequest);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> deleteTransaction(UUID id) {

        deleteTransactionUseCase.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}