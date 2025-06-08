package br.com.transaction.domain.usecase.category.read.id;

import br.com.transaction.adapters.input.dto.category.CategoryResponse;
import br.com.transaction.annotations.LogExecution;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@LogExecution
public class FindCategoryByIdUseCase {

    private final CategoryRepositoryPort categoryRepositoryPort;

    public FindCategoryByIdUseCase(CategoryRepositoryPort categoryRepositoryPort) {
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    public CategoryResponse findCategoryById(UUID id) {

        TransactionCategory category = categoryRepositoryPort.findById(id);
        return CategoryResponse.fromDomain(category);
    }
}