package br.com.transaction.domain.usecase.transaction.util;

import br.com.transaction.adapters.input.dto.transaction.request.TransactionRequest;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;

public class TransactionUtil {

    private TransactionUtil() {
    }

    public static void validateTransactionStatus(TransactionRequest transactionRequest) {

        if (TransactionStatusEnum.PENDING.equals(transactionRequest.status()) && transactionRequest.executionDate() != null) {
            throw new IllegalArgumentException("Execution date must be null for pending transactions.");
        }

        if (TransactionStatusEnum.CANCELED.equals(transactionRequest.status()) && transactionRequest.executionDate() != null) {
            throw new IllegalArgumentException("Execution date must be null for canceled transactions.");
        }

        if (TransactionStatusEnum.COMPLETED.equals(transactionRequest.status()) && transactionRequest.executionDate() == null) {
            throw new IllegalArgumentException("Execution date must not be null for completed transactions.");
        }
    }
}