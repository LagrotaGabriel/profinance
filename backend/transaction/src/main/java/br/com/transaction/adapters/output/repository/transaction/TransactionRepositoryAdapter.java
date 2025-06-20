package br.com.transaction.adapters.output.repository.transaction;

import br.com.transaction.adapters.output.entity.TransactionEntity;
import br.com.transaction.adapters.output.mapper.TransactionMapper;
import br.com.transaction.domain.model.Transaction;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

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

    @Override
    public Transaction findById(UUID id) {

        Optional<TransactionEntity> transactionEntityOptional = transactionJpaRepository.findById(id);

        if (transactionEntityOptional.isEmpty()) {
            // TODO IMPL CUSTOM EXCEPTION
            throw new IllegalArgumentException("Transaction not found with id: " + id);
        }

        TransactionEntity transactionEntity = transactionEntityOptional.get();
        return TransactionMapper.toDomain(transactionEntity);
    }

    @Override
    public Page<Transaction> findPageableTransaction(Pageable pageable,
                                                     Integer month,
                                                     Integer year,
                                                     TransactionStatusEnum status,
                                                     UUID categoryId) {

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        Page<TransactionEntity> transactionEntityPage =
                transactionJpaRepository.findPageableTransaction(
                        pageable,
                        startDate,
                        endDate,
                        status,
                        categoryId
                );

        return TransactionMapper.toDomainPage(transactionEntityPage);
    }
}