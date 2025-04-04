package org.dev.lap.dtos.request;

import java.time.LocalDateTime;

public class TransactionLogRequest {
    private String borrowerId;
    private String librarianId;
    private LocalDateTime dueDateTime;

    // Getters
    public String getBorrowerId() {
        return this.borrowerId;
    }

    public String getLibrarianId() {
        return this.librarianId;
    }

    public LocalDateTime getDueDateTime() {
        return this.dueDateTime;
    }

    // Setters
    public void setBorrowerId(String borrowerId) {
        this.borrowerId = borrowerId;
    }

    public void setLibrarianId(String librarianId) {
        this.librarianId = librarianId;
    }

    public void setDueDateTime(LocalDateTime dueDateTime) {
        this.dueDateTime = dueDateTime;
    }
}