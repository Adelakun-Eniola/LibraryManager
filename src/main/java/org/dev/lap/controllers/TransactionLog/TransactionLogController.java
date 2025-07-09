package org.dev.lap.controllers.TransactionLog;

import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.data.repositories.TransactionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/api/librarian")
public class TransactionLogController {
    @Autowired
    private TransactionLogRepository transactionLogRepository;

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionLog>> getAllTransactions() {
        try {
            List<TransactionLog> transactions = transactionLogRepository.findAll();
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
