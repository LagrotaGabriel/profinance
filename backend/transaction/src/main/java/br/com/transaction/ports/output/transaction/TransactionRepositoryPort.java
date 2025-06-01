package br.com.transaction.ports.output.transaction;

import br.com.transaction.domain.model.Transaction;

public interface TransactionRepositoryPort {

    void save(Transaction transaction);
}
