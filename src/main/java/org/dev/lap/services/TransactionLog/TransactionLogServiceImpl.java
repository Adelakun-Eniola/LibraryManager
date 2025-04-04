package org.dev.lap.services.TransactionLog;

import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.data.repositories.TransactionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TransactionLogServiceImpl implements TransactionLogService{

    @Autowired
    private TransactionLogRepository transactionLogRepository;

    @Override
    public List<TransactionLog> getAllTransactions() {
        return transactionLogRepository.findAll();
    }

}
