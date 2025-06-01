CREATE TABLE tb_pfn_transaction_category (
    cod_category_trc UUID NOT NULL PRIMARY KEY,
    ldt_creation_trc TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    str_name_trc VARCHAR(60) NOT NULL,
    enm_type_trc VARCHAR(255) NOT NULL
);