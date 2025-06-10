package br.com.transaction.domain.usecase.transaction.delete;

import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DeleteTransactionUseCase {

    private final TransactionRepositoryPort transactionRepositoryPort;

    public DeleteTransactionUseCase(TransactionRepositoryPort transactionRepositoryPort) {
        this.transactionRepositoryPort = transactionRepositoryPort;
    }

    public void deleteTransaction(UUID id) {
        transactionRepositoryPort.deleteById(id);
    }
}