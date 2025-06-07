package br.com.transaction.ports.output.category;

import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CategoryRepositoryPort {

    void save(
            TransactionCategory transactionCategory
    );

    TransactionCategory findById(
            UUID id
    );

    Boolean existsByNameAndType(
            String name,
            TransactionCategoryTypeEnum type
    );

    Page<TransactionCategory> findPageableCategory(
            Pageable pageable,
            String name,
            TransactionCategoryTypeEnum type
    );
}
