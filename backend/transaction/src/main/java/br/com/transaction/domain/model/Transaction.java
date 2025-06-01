package br.com.transaction.domain.model;

import br.com.transaction.adapters.output.entity.TransactionEntity;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class Transaction {

    private UUID id;
    private String description;
    private BigDecimal value;
    private LocalDateTime creationTimeStamp;
    private LocalDate expirationDate;
    private LocalDate executionDate;
    private TransactionStatusEnum status;
    private TransactionCategory category;

    public Transaction() {
    }

    public Transaction(TransactionEntity transactionEntity,
                       TransactionCategory transactionCategory) {

        this.id = transactionEntity.getId();
        this.creationTimeStamp = transactionEntity.getCreationTimeStamp();
        this.description = transactionEntity.getDescription();
        this.value = transactionEntity.getValue();
        this.expirationDate = transactionEntity.getExpirationDate();
        this.executionDate = transactionEntity.getExecutionDate();
        this.status = transactionEntity.getStatus();
        this.category = transactionCategory;
    }

    public Transaction(String description,
                       BigDecimal value,
                       LocalDate expirationDate,
                       LocalDate executionDate,
                       TransactionStatusEnum status,
                       TransactionCategory category) {

        this.id = UUID.randomUUID();
        this.creationTimeStamp = LocalDateTime.now();
        this.description = description;
        this.value = value;
        this.expirationDate = expirationDate;
        this.executionDate = executionDate;
        this.status = status;
        this.category = category;
    }

    public boolean isExpired() {
        return expirationDate != null && LocalDate.now().isAfter(expirationDate);
    }

    public boolean isExecuted() {
        return executionDate != null && TransactionStatusEnum.COMPLETED.equals(status);
    }
}