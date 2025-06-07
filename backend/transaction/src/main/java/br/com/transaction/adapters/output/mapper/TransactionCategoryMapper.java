package br.com.transaction.adapters.output.mapper;

import br.com.transaction.adapters.output.entity.TransactionCategoryEntity;
import br.com.transaction.domain.model.TransactionCategory;
import org.springframework.data.domain.Page;

public class TransactionCategoryMapper {

    private TransactionCategoryMapper() {
    }

    public static TransactionCategoryEntity toEntity(TransactionCategory transactionCategory) {

        if (transactionCategory == null) {
            return null;
        }

        TransactionCategoryEntity entity = new TransactionCategoryEntity();
        entity.setId(transactionCategory.getId());
        entity.setCreationTimeStamp(transactionCategory.getCreationTimeStamp());
        entity.setName(transactionCategory.getName());
        entity.setType(transactionCategory.getType());
        return entity;
    }

    public static TransactionCategory toDomain(TransactionCategoryEntity entity) {

        if (entity == null) {
            return null;
        }

        return new TransactionCategory(entity);
    }

    public static Page<TransactionCategory> toDomainPage(Page<TransactionCategoryEntity> categoryEntityPage) {

        if (categoryEntityPage == null) {
            return null;
        }

        return categoryEntityPage.map(TransactionCategoryMapper::toDomain);
    }
}