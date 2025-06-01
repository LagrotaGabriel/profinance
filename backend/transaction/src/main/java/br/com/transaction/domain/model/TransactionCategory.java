package br.com.transaction.domain.model;

import br.com.transaction.adapters.output.entity.TransactionCategoryEntity;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class TransactionCategory {

    private UUID id;
    private LocalDateTime creationTimeStamp;
    private String name;
    private TransactionCategoryTypeEnum type;

    public TransactionCategory() {
    }

    public TransactionCategory(TransactionCategoryEntity transactionCategoryEntity) {

        this.id = transactionCategoryEntity.getId();
        this.creationTimeStamp = transactionCategoryEntity.getCreationTimeStamp();
        this.name = transactionCategoryEntity.getName();
        this.type = transactionCategoryEntity.getType();
    }

    public TransactionCategory(String name,
                               TransactionCategoryTypeEnum type) {

        this.id = UUID.randomUUID();
        this.creationTimeStamp = LocalDateTime.now();
        this.name = name;
        this.type = type;
    }
}
