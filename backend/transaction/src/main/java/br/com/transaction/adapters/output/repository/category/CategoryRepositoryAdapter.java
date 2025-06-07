package br.com.transaction.adapters.output.repository.category;

import br.com.transaction.adapters.output.entity.TransactionCategoryEntity;
import br.com.transaction.adapters.output.mapper.TransactionCategoryMapper;
import br.com.transaction.domain.model.TransactionCategory;
import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import br.com.transaction.ports.output.category.CategoryRepositoryPort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public class CategoryRepositoryAdapter implements CategoryRepositoryPort {

    private final CategoryJpaRepository categoryJpaRepository;

    public CategoryRepositoryAdapter(CategoryJpaRepository categoryJpaRepository) {
        this.categoryJpaRepository = categoryJpaRepository;
    }

    @Override
    public void save(TransactionCategory transactionCategory) {
        TransactionCategoryEntity categoryEntity = TransactionCategoryMapper.toEntity(transactionCategory);
        categoryJpaRepository.save(categoryEntity);
    }

    @Override
    public TransactionCategory findById(UUID id) {

        Optional<TransactionCategoryEntity> categoryEntityOptional = categoryJpaRepository.findById(id);

        if (categoryEntityOptional.isEmpty()) {
            // TODO IMPL CUSTOM EXCEPTION
            throw new IllegalArgumentException("Category not found with id: " + id);
        }

        TransactionCategoryEntity categoryEntity = categoryEntityOptional.get();
        return TransactionCategoryMapper.toDomain(categoryEntity);
    }

    @Override
    public Boolean existsByNameAndType(String name,
                                       TransactionCategoryTypeEnum type) {

        return categoryJpaRepository.existsByNameAndType(
                name,
                type
        );
    }

    @Override
    public Page<TransactionCategory> findPageableCategory(Pageable pageable,
                                                          String name,
                                                          TransactionCategoryTypeEnum type) {

        Page<TransactionCategoryEntity> categoryEntityPage =
                categoryJpaRepository.findPageableCategory(
                        pageable,
                        name,
                        type
                );

        return TransactionCategoryMapper.toDomainPage(categoryEntityPage);
    }
}