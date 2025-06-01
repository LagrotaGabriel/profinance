package br.com.transaction.adapters.input;

import br.com.transaction.adapters.input.dto.CreateCategoryRequest;
import br.com.transaction.domain.service.CreateCategoryService;
import br.com.transaction.ports.input.CategoryControllerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryControllerAdapter implements CategoryControllerPort {

    private final CreateCategoryService createCategoryService;

    public CategoryControllerAdapter(CreateCategoryService createCategoryService) {
        this.createCategoryService = createCategoryService;
    }

    @Override
    public ResponseEntity<Void> createNewCategory(CreateCategoryRequest createCategoryRequest) {
        createCategoryService.saveCategory(createCategoryRequest);
        return ResponseEntity.status(201).build();
    }
}