package br.com.transaction.adapters.output.repository.transaction;

import br.com.transaction.adapters.output.entity.TransactionEntity;
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
                    "AND ((t.expirationDate BETWEEN :startDate AND :endDate) OR (t.executionDate BETWEEN :startDate AND :endDate))"
    )
    Page<TransactionEntity> findPageableTransaction(
            Pageable pageable,
            LocalDate startDate,
            LocalDate endDate,
            TransactionStatusEnum status,
            UUID categoryId
    );
}
