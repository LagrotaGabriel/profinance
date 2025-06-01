package br.com.transaction.adapters.output.repository.category;

import br.com.transaction.adapters.output.entity.TransactionCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryJpaRepository extends JpaRepository<TransactionCategoryEntity, UUID> {
}
