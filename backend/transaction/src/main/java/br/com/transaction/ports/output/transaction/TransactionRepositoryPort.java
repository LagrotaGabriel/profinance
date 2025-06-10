package br.com.transaction.ports.output.transaction;

import br.com.transaction.domain.model.Transaction;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TransactionRepositoryPort {

    void save(Transaction transaction);

    Transaction findById(
            UUID id
    );

    Page<Transaction> findPageableTransaction(
            Pageable pageable,
            Integer month,
            Integer year,
            TransactionStatusEnum status,
            UUID categoryId
    );

    void deleteById(
            UUID id
    );
}
