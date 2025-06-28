package br.com.transaction.adapters.output.repository.transaction;

import br.com.transaction.adapters.output.entity.TransactionEntity;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.UUID;

public interface TransactionJpaRepository extends JpaRepository<TransactionEntity, UUID> {

    @Query(value =
            "SELECT t FROM TransactionEntity t " +
                    "WHERE (:status IS NULL OR t.status = :status) " +
                    "AND (:categoryId IS NULL OR t.category.id = :categoryId) " +
                    "AND (:description IS NULL OR t.description = :description) " +
                    "AND (:type IS NULL OR t.category.type = :type) " +
                    "AND ((t.expirationDate BETWEEN :startDate AND :endDate) OR (t.executionDate BETWEEN :startDate AND :endDate))"
    )
    Page<TransactionEntity> findPageableTransaction(
            Pageable pageable,
            LocalDate startDate,
            LocalDate endDate,
            String description,
            TransactionStatusEnum status,
            TransactionCategoryTypeEnum type,
            UUID categoryId
    );
}
