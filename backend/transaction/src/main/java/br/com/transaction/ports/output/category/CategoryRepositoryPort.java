package br.com.transaction.ports.output.category;

import br.com.transaction.domain.model.TransactionCategory;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepositoryPort {
    TransactionCategory findById(UUID id);
}
