package br.com.transaction.domain.service;

import br.com.transaction.adapters.input.dto.CreateCategoryRequest;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class CreateCategoryService {

    private final CategoryRepositoryPort categoryRepositoryPort;

    public CreateCategoryService(CategoryRepositoryPort categoryRepositoryPort) {

        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    public void saveCategory(CreateCategoryRequest createCategoryRequest) {

        TransactionCategory transactionCategory = new TransactionCategory(
                createCategoryRequest.name(),
                createCategoryRequest.type()
        );

        categoryRepositoryPort.save(transactionCategory);
    }
}