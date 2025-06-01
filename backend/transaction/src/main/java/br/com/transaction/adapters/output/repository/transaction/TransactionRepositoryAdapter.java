package br.com.transaction.adapters.output.repository.transaction;

import br.com.transaction.adapters.output.entity.TransactionEntity;
import br.com.transaction.adapters.output.mapper.TransactionMapper;
import br.com.transaction.domain.model.Transaction;
import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.stereotype.Repository;

@Repository
public class TransactionRepositoryAdapter implements TransactionRepositoryPort {

    private final TransactionJpaRepository transactionJpaRepository;

    public TransactionRepositoryAdapter(TransactionJpaRepository transactionJpaRepository) {
        this.transactionJpaRepository = transactionJpaRepository;
    }

    @Override
    public void save(Transaction transaction) {
        TransactionEntity entity = TransactionMapper.toEntity(transaction);
        transactionJpaRepository.save(entity);
    }
}