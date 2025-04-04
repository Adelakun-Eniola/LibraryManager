package org.dev.lap.dtos.response;

import lombok.Data;
import org.dev.lap.data.models.TransactionStatus;

import java.time.LocalDateTime;


public class TransactionLogResponse {

    private String transactionLogId;
    private String borrowerId;
    private String librarianId;
    private LocalDateTime borrowedTime;
    private LocalDateTime dueDateTime;
    private LocalDateTime returnDate;
    private String transactionStatus;

    public String getTransactionLogId() {
        return transactionLogId;
    }

    public void setTransactionLogId(String transactionLogId) {
        this.transactionLogId = transactionLogId;
    }

    public String getBorrowerId() {
        return borrowerId;
    }

    public void setBorrowerId(String borrowerId) {
        this.borrowerId = borrowerId;
    }

    public String getLibrarianId() {
        return librarianId;
    }

    public void setLibrarianId(String librarianId) {
        this.librarianId = librarianId;
    }

    public LocalDateTime getBorrowedTime() {
        return borrowedTime;
    }

    public void setBorrowedTime(LocalDateTime borrowedTime) {
        this.borrowedTime = borrowedTime;
    }

    public LocalDateTime getDueDateTime() {
        return dueDateTime;
    }

    public void setDueDateTime(LocalDateTime dueDateTime) {
        this.dueDateTime = dueDateTime;
    }

    public LocalDateTime getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDateTime returnDate) {
        this.returnDate = returnDate;
    }

    public String getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(String transactionStatus) {
        this.transactionStatus = transactionStatus;
    }
}
