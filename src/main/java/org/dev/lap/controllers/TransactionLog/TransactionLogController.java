package org.dev.lap.controllers.TransactionLog;

import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.data.repositories.TransactionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/librarian")
public class TransactionLogController {
    @Autowired
    private TransactionLogRepository transactionLogRepository;

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionLog>> getAllTransactions() {
        List<TransactionLog> transactions = transactionLogRepository.findAll();
        return ResponseEntity.ok(transactions);
    }

}
