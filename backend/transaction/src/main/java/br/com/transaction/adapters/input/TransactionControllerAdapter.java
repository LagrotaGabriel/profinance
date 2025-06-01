package br.com.transaction.adapters.input;

import br.com.transaction.adapters.input.dto.CreateTransactionRequest;
import br.com.transaction.domain.service.TransactionService;
import br.com.transaction.ports.input.TransactionControllerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionControllerAdapter implements TransactionControllerPort {

    private final TransactionService transactionService;

    public TransactionControllerAdapter(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @Override
    public ResponseEntity<Void> createNewTransaction(CreateTransactionRequest createTransactionRequest) {
        transactionService.saveTransaction(createTransactionRequest);
        return ResponseEntity.status(201).build();
    }
}