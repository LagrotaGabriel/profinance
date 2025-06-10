package br.com.transaction.domain.usecase.transaction.read.id;

import br.com.transaction.adapters.input.dto.transaction.response.TransactionResponse;
import br.com.transaction.annotations.LogExecution;
import br.com.transaction.domain.model.Transaction;
import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@LogExecution
public class FindTransactionByIdUseCase {

    private final TransactionRepositoryPort transactionRepositoryPort;

    public FindTransactionByIdUseCase(TransactionRepositoryPort transactionRepositoryPort) {
        this.transactionRepositoryPort = transactionRepositoryPort;
    }

    public TransactionResponse findTransactionById(UUID id) {

        Transaction transaction = transactionRepositoryPort.findById(id);
        return TransactionResponse.fromDomain(transaction);
    }
}