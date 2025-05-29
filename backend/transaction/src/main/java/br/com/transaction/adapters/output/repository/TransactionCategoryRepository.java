package br.com.transaction.adapters.output.repository;

import br.com.transaction.adapters.output.entity.TransactionCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TransactionCategoryRepository extends JpaRepository<TransactionCategoryEntity, UUID> {
}
