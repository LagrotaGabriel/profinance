package br.com.transaction.domain.usecase.transaction.create;

import br.com.transaction.adapters.input.dto.transaction.request.TransactionRequest;
import br.com.transaction.annotations.LogExecution;
import br.com.transaction.domain.model.Transaction;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.stereotype.Service;

@Service
@LogExecution
public class CreateTransactionUseCase {

    private final TransactionRepositoryPort transactionRepositoryPort;
    private final CategoryRepositoryPort categoryRepositoryPort;

    public CreateTransactionUseCase(TransactionRepositoryPort transactionRepositoryPort,
                                    CategoryRepositoryPort categoryRepositoryPort) {

        this.transactionRepositoryPort = transactionRepositoryPort;
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    public void saveTransaction(TransactionRequest transactionRequest) {

        TransactionCategory transactionCategory =
                categoryRepositoryPort.findById(
                        transactionRequest.categoryId()
                );

        validateTransactionStatus(transactionRequest);

        Transaction transaction = new Transaction(
                transactionRequest.description(),
                transactionRequest.value(),
                transactionRequest.expirationDate(),
                transactionRequest.executionDate(),
                transactionRequest.status(),
                transactionCategory
        );

        transactionRepositoryPort.save(transaction);
    }

    public void validateTransactionStatus(TransactionRequest transactionRequest) {

        if (TransactionStatusEnum.PENDING.equals(transactionRequest.status()) && transactionRequest.executionDate() != null) {
            throw new IllegalArgumentException("Execution date must be null for pending transactions.");
        }

        if (TransactionStatusEnum.CANCELED.equals(transactionRequest.status()) && transactionRequest.executionDate() != null) {
            throw new IllegalArgumentException("Execution date must be null for canceled transactions.");
        }

        if (TransactionStatusEnum.COMPLETED.equals(transactionRequest.status()) && transactionRequest.executionDate() == null) {
            throw new IllegalArgumentException("Execution date must not be null for completed transactions.");
        }
    }
}