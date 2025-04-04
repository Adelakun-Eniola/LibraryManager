package org.dev.lap.services.TransactionLog;

import org.dev.lap.data.models.TransactionLog;

import java.util.List;

public interface TransactionLogService {
    List<TransactionLog> getAllTransactions();
}
