package br.com.transaction.ports.input;

import br.com.transaction.adapters.exception.models.StandardError;
import br.com.transaction.adapters.input.dto.category.CategoryResponse;
import br.com.transaction.adapters.input.dto.category.create.CreateCategoryRequest;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import br.com.transaction.globals.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Transaction category management")
@RequestMapping("/profinance/api/v1/category")
public interface CategoryControllerPort {

    @PostMapping
    @Operation(summary = "Creates a new category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category created successfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Invalid request",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "409", description = "Category already exists",
                    content = {@Content(mediaType = "application/json")}),
    })
    ResponseEntity<Void> createNewCategory(
            @Valid @RequestBody CreateCategoryRequest createCategoryRequest
    );

    @GetMapping
    @Operation(summary = "Finds pageable categories")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories found successfully",
                    content = {@Content(mediaType = "application/json")}),
    })
    ResponseEntity<PageResponse<CategoryResponse>> findPageableCategories(
            @PageableDefault(size = 20) Pageable pageable,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "type", required = false) TransactionCategoryTypeEnum type
    );

    @GetMapping("/{id}")
    @Operation(summary = "Finds category by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category found successfully",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "Category not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = StandardError.class))}),
    })
    ResponseEntity<CategoryResponse> findCategoryById(
            @PathVariable(value = "id") UUID id
    );
}
