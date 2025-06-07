package br.com.transaction.adapters.output.repository.category;

import br.com.transaction.adapters.output.entity.TransactionCategoryEntity;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CategoryJpaRepository extends JpaRepository<TransactionCategoryEntity, UUID> {

    @Query(value =
            "SELECT t FROM TransactionCategoryEntity t " +
                    "WHERE (:name IS NULL OR UPPER(t.name) LIKE %:name%) " +
                    "AND (:type IS NULL OR t.type = :type)"
    )
    Page<TransactionCategoryEntity> findPageableCategory(
            Pageable pageable,
            String name,
            TransactionCategoryTypeEnum type
    );

    Boolean existsByNameAndType(
            String name,
            TransactionCategoryTypeEnum type
    );
}