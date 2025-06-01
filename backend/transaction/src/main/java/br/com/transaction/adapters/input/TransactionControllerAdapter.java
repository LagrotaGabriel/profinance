package br.com.transaction.adapters.input;

import br.com.transaction.adapters.input.dto.CreateTransactionRequest;
import br.com.transaction.domain.service.CreateTransactionService;
import br.com.transaction.ports.input.TransactionControllerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionControllerAdapter implements TransactionControllerPort {

    private final CreateTransactionService createTransactionService;

    public TransactionControllerAdapter(CreateTransactionService createTransactionService) {
        this.createTransactionService = createTransactionService;
    }

    @Override
    public ResponseEntity<Void> createNewTransaction(CreateTransactionRequest createTransactionRequest) {
        createTransactionService.saveTransaction(createTransactionRequest);
        return ResponseEntity.status(201).build();
    }
}