package br.com.transaction.domain.usecase.category.read.pageable;

import br.com.transaction.adapters.input.dto.category.CategoryResponse;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import br.com.transaction.globals.PageResponse;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FindPageableCategoriesUseCase {

    private final CategoryRepositoryPort categoryRepositoryPort;

    public FindPageableCategoriesUseCase(CategoryRepositoryPort categoryRepositoryPort) {
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    public PageResponse<CategoryResponse> findPageableCategory(Pageable pageable,
                                                               String name,
                                                               TransactionCategoryTypeEnum type) {

        Page<TransactionCategory> categoryEntityPage =
                categoryRepositoryPort.findPageableCategory(
                        pageable,
                        name.isEmpty() ? null : name.toUpperCase(),
                        type
                );

        List<CategoryResponse> categoriesResponse =
                CategoryResponse.fromList(
                        categoryEntityPage.getContent()
                );

        return new PageResponse<>(
                categoryEntityPage,
                categoriesResponse
        );
    }
}