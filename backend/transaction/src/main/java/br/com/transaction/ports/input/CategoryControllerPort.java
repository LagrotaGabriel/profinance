package br.com.transaction.ports.input;

import br.com.transaction.adapters.input.dto.CreateCategoryRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "Transaction category management")
@RequestMapping("/profinance/api/v1/category")
public interface CategoryControllerPort {

    // TODO ADD API ERROR RESPONSES

    @PostMapping
    @Operation(summary = "Creates a new category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category created successfully",
                    content = {@Content(mediaType = "application/json")}),
    })
    ResponseEntity<Void> createNewCategory(
            @Valid @RequestBody CreateCategoryRequest createCategoryRequest
    );
}
