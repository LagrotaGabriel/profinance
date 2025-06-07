package br.com.transaction.adapters.output.mapper;

import br.com.transaction.adapters.output.entity.TransactionEntity;
import br.com.transaction.domain.model.Transaction;
import org.springframework.data.domain.Page;

public class TransactionMapper {

    private TransactionMapper() {
    }

    public static TransactionEntity toEntity(Transaction transaction) {

        if (transaction == null) {
            return null;
        }

        TransactionEntity entity = new TransactionEntity();
        entity.setId(transaction.getId());
        entity.setDescription(transaction.getDescription());
        entity.setValue(transaction.getValue());
        entity.setCreationTimeStamp(transaction.getCreationTimeStamp());
        entity.setExpirationDate(transaction.getExpirationDate());
        entity.setExecutionDate(transaction.getExecutionDate());
        entity.setStatus(transaction.getStatus());
        entity.setCategory(TransactionCategoryMapper.toEntity(transaction.getCategory()));
        return entity;
    }

    public static Transaction toDomain(TransactionEntity entity) {

        if (entity == null) return null;

        return new Transaction(
                entity,
                TransactionCategoryMapper.toDomain(entity.getCategory())
        );
    }

    public static Page<Transaction> toDomainPage(Page<TransactionEntity> transactionEntityPage) {

        if (transactionEntityPage == null) return null;

        return transactionEntityPage.map(TransactionMapper::toDomain);
    }
}