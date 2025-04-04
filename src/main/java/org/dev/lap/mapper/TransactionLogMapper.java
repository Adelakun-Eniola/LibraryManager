package org.dev.lap.mapper;

import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.dtos.request.TransactionLogRequest;
import org.dev.lap.dtos.response.TransactionLogResponse;

import java.time.LocalDateTime;

public class TransactionLogMapper {

    // Request → Entity (for new transactions)
    public static TransactionLog toEntity(TransactionLogRequest request) {
        TransactionLog log = new TransactionLog();
        log.setBorrowerId(request.getBorrowerId());
        log.setLibrarianId(request.getLibrarianId());
        log.setBorrowedTime(LocalDateTime.now()); // Auto-set current time
        log.setDueDateTime(request.getDueDateTime());
        log.setTransactionStatus("AVAILABLE"); // Default status
        return log;
    }

    // Entity → Response
    public static TransactionLogResponse toResponse(TransactionLog log) {
        TransactionLogResponse response = new TransactionLogResponse();
        response.setTransactionLogId(log.getTransactionLogId());
        response.setBorrowerId(log.getBorrowerId());
        response.setLibrarianId(log.getLibrarianId());
        response.setBorrowedTime(log.getBorrowedTime());
        response.setDueDateTime(log.getDueDateTime());
        response.setReturnDate(log.getReturnDate());
        response.setTransactionStatus(log.getTransactionStatus());
        return response;
    }
}
