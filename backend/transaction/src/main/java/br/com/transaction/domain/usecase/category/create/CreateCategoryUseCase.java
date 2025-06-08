package br.com.transaction.domain.usecase.category.create;

import br.com.transaction.adapters.exception.models.DuplicateResourceException;
import br.com.transaction.adapters.input.dto.category.create.CreateCategoryRequest;
import br.com.transaction.annotations.LogExecution;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import org.springframework.stereotype.Service;

@Service
@LogExecution
public class CreateCategoryUseCase {

    private final CategoryRepositoryPort categoryRepositoryPort;

    public CreateCategoryUseCase(CategoryRepositoryPort categoryRepositoryPort) {

        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    public void saveCategory(CreateCategoryRequest createCategoryRequest) {

        Boolean alreadyExists =
                categoryRepositoryPort.existsByNameAndType(
                        createCategoryRequest.name(),
                        createCategoryRequest.type()
                );

        if (alreadyExists)
            throw new DuplicateResourceException("Category with this name already exists.");

        TransactionCategory transactionCategory = new TransactionCategory(
                createCategoryRequest.name(),
                createCategoryRequest.type()
        );

        categoryRepositoryPort.save(transactionCategory);
    }
}