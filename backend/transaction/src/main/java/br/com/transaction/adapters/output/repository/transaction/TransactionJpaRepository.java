package br.com.transaction.adapters.output.repository.transaction;

import br.com.transaction.adapters.output.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransactionJpaRepository extends JpaRepository<TransactionEntity, UUID> {
}
