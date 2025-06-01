package br.com.transaction.domain.service;

import br.com.transaction.adapters.input.dto.CreateTransactionRequest;
import br.com.transaction.annotations.LogExecution;
import br.com.transaction.domain.model.Transaction;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.stereotype.Service;

@Service
@LogExecution
public class CreateTransactionService {

    private final TransactionRepositoryPort transactionRepositoryPort;
    private final CategoryRepositoryPort categoryRepositoryPort;

    public CreateTransactionService(TransactionRepositoryPort transactionRepositoryPort,
                                    CategoryRepositoryPort categoryRepositoryPort) {

        this.transactionRepositoryPort = transactionRepositoryPort;
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    public void saveTransaction(CreateTransactionRequest createTransactionRequest) {

        TransactionCategory transactionCategory =
                categoryRepositoryPort.findById(
                        createTransactionRequest.categoryId()
                );

        Transaction transaction = new Transaction(
                createTransactionRequest.description(),
                createTransactionRequest.value(),
                createTransactionRequest.expirationDate(),
                createTransactionRequest.executionDate(),
                createTransactionRequest.status(),
                transactionCategory
        );

        transactionRepositoryPort.save(transaction);
    }
}