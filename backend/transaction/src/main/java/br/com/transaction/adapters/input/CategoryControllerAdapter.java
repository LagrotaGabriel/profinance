package br.com.transaction.adapters.input;

import br.com.transaction.adapters.input.dto.category.CategoryResponse;
import br.com.transaction.adapters.input.dto.category.create.CreateCategoryRequest;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import br.com.transaction.domain.usecase.category.create.CreateCategoryUseCase;
import br.com.transaction.domain.usecase.category.read.id.FindCategoryByIdUseCase;
import br.com.transaction.domain.usecase.category.read.pageable.FindPageableCategoriesUseCase;
import br.com.transaction.globals.PageResponse;
import br.com.transaction.ports.input.CategoryControllerPort;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class CategoryControllerAdapter implements CategoryControllerPort {

    private final CreateCategoryUseCase createCategoryUseCase;
    private final FindPageableCategoriesUseCase findPageableCategoriesUseCase;
    private final FindCategoryByIdUseCase findCategoryByIdUseCase;

    public CategoryControllerAdapter(CreateCategoryUseCase createCategoryUseCase,
                                     FindPageableCategoriesUseCase findPageableCategoriesUseCase,
                                     FindCategoryByIdUseCase findCategoryByIdUseCase) {

        this.createCategoryUseCase = createCategoryUseCase;
        this.findPageableCategoriesUseCase = findPageableCategoriesUseCase;
        this.findCategoryByIdUseCase = findCategoryByIdUseCase;
    }

    @Override
    public ResponseEntity<Void> createNewCategory(CreateCategoryRequest createCategoryRequest) {
        createCategoryUseCase.saveCategory(createCategoryRequest);
        return ResponseEntity.status(201).build();
    }

    @Override
    public ResponseEntity<PageResponse<CategoryResponse>> findPageableCategories(Pageable pageable,
                                                                                 String name,
                                                                                 TransactionCategoryTypeEnum type) {

        PageResponse<CategoryResponse> pageResponse =
                findPageableCategoriesUseCase.findPageableCategory(
                        pageable,
                        name,
                        type
                );

        return (pageResponse.getContent().isEmpty())
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(pageResponse);
    }

    @Override
    public ResponseEntity<CategoryResponse> findCategoryById(UUID id) {

        CategoryResponse categoryResponse = findCategoryByIdUseCase.findCategoryById(id);

        return (categoryResponse == null)
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(categoryResponse);
    }
}