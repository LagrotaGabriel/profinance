package br.com.transaction.domain.usecase.transaction.read.pageable;

import br.com.transaction.adapters.input.dto.transaction.response.TransactionResponse;
import br.com.transaction.annotations.LogExecution;
import br.com.transaction.domain.model.Transaction;
import br.com.transaction.domain.model.enums.TransactionStatusEnum;
import br.com.transaction.globals.PageResponse;
import br.com.transaction.ports.output.transaction.TransactionRepositoryPort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@LogExecution
public class FindPageableTransactionsUseCase {

    private final TransactionRepositoryPort transactionRepositoryPort;

    public FindPageableTransactionsUseCase(TransactionRepositoryPort transactionRepositoryPort) {
        this.transactionRepositoryPort = transactionRepositoryPort;
    }

    public PageResponse<TransactionResponse> findPageableTransaction(Pageable pageable,
                                                                     Integer month,
                                                                     Integer year,
                                                                     TransactionStatusEnum status,
                                                                     UUID categoryId) {

        Page<Transaction> transactionEntityPage =
                transactionRepositoryPort.findPageableTransaction(
                        pageable,
                        month,
                        year,
                        status,
                        categoryId
                );

        List<TransactionResponse> categoriesResponse =
                TransactionResponse.fromList(
                        transactionEntityPage.getContent()
                );

        return new PageResponse<>(
                transactionEntityPage,
                categoriesResponse
        );
    }
}