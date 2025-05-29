package br.com.transaction.adapters.output.entity;

import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_pfn_transaction")
public class TransactionEntity {

    @Id
    @Comment("Primary key of the transaction - UUID")
    @Column(name = "cod_transaction_trn", nullable = false, updatable = false)
    private UUID id;

    @Comment("Transaction description")
    @Column(name = "str_description_trn", length = 60, nullable = false)
    private String description;

    @Comment("Transaction value")
    @Column(name = "dcm_value_trn", nullable = false)
    private BigDecimal value;

    @CreationTimestamp
    @Comment("Creation date and time of the transaction")
    @Column(name = "ldt_creation_trn", nullable = false, updatable = false)
    private LocalDateTime creationTimeStamp;

    @Comment("Transaction expiration date")
    @Column(name = "dt_expiration_trn", nullable = false)
    private LocalDate expirationDate;

    @Comment("Transaction execution date")
    @Column(name = "dt_execution_trn")
    private LocalDate executionDate;

    @Enumerated(EnumType.STRING)
    @Comment("Transaction status")
    @Column(name = "enm_status_trn", nullable = false)
    private TransactionStatusEnum status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cod_category_trn", nullable = false)
    private TransactionCategoryEntity category;
}