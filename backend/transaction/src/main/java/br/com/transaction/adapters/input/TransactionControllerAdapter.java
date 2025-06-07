package br.com.transaction.adapters.input;

import br.com.transaction.adapters.input.dto.transaction.create.CreateTransactionRequest;
import br.com.transaction.domain.usecase.transaction.create.CreateTransactionUseCase;
import br.com.transaction.ports.input.TransactionControllerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionControllerAdapter implements TransactionControllerPort {

    private final CreateTransactionUseCase createTransactionUseCase;

    public TransactionControllerAdapter(CreateTransactionUseCase createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    @Override
    public ResponseEntity<Void> createNewTransaction(CreateTransactionRequest createTransactionRequest) {
        createTransactionUseCase.saveTransaction(createTransactionRequest);
        return ResponseEntity.status(201).build();
    }
}