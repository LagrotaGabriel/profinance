CREATE TABLE tb_pfn_transaction (
    cod_transaction_trn UUID NOT NULL PRIMARY KEY,
    str_description_trn VARCHAR(60) NOT NULL,
    dcm_value_trn DECIMAL NOT NULL,
    ldt_creation_trn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dt_expiration_trn DATE NOT NULL,
    dt_execution_trn DATE,
    enm_status_trn VARCHAR(255) NOT NULL,
    cod_category_trn UUID NOT NULL,
    CONSTRAINT fk_transaction_category FOREIGN KEY (cod_category_trn) REFERENCES tb_pfn_transaction_category (cod_category_trc)
);