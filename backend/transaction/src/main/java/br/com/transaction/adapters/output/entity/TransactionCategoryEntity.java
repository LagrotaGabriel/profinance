package br.com.transaction.adapters.output.entity;

import br.com.transaction.domain.model.enums.TransactionCategoryTypeEnum;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_pfn_transaction_category")
public class TransactionCategoryEntity {

    @Id
    @Comment("Primary key of the transaction category - UUID")
    @Column(name = "cod_category_trc", nullable = false, updatable = false)
    private UUID id;

    @CreationTimestamp
    @Comment("Creation date and time of the transaction category")
    @Column(name = "ldt_creation_trc", nullable = false, updatable = false)
    private LocalDateTime creationTimeStamp;

    @Comment("Category name")
    @Column(name = "str_name_trc", length = 60, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Comment("Transaction type")
    @Column(name = "enm_type_trc", nullable = false)
    private TransactionCategoryTypeEnum type;
}