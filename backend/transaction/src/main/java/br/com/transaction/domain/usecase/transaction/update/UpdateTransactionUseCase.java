package br.com.transaction.domain.usecase.transaction.update;

import br.com.transaction.adapters.input.dto.transaction.request.TransactionRequest;
import br.com.transaction.domain.model.Transaction;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.domain.usecase.transaction.util.TransactionUtil;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UpdateTransactionUseCase {

    private final TransactionRepositoryPort transactionRepositoryPort;
    private final CategoryRepositoryPort categoryRepositoryPort;

    public UpdateTransactionUseCase(TransactionRepositoryPort transactionRepositoryPort,
                                    CategoryRepositoryPort categoryRepositoryPort) {
        this.transactionRepositoryPort = transactionRepositoryPort;
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    public void updateTransaction(UUID id,
                                  TransactionRequest request) {

        if (request == null || id == null) {
            throw new IllegalArgumentException("Invalid transaction update request");
        }

        Transaction existingTransaction = transactionRepositoryPort.findById(id);

        TransactionUtil.validateTransactionStatus(request);

        TransactionCategory transactionCategory =
                categoryRepositoryPort.findById(
                        request.categoryId()
                );

        existingTransaction.updateData(request, transactionCategory);

        transactionRepositoryPort.save(existingTransaction);
    }
}