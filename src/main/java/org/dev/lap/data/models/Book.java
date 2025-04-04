package org.dev.lap.data.models;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
public class Book {
    @Id
    private String bookId;
    private String bookName;
    private String bookAuthor;
    private String Isbn;
    private int availableQuantity;
    private TransactionStatus transactionStatus;

    public String getBookId() {
        return bookId;
    }

    public List<String> getCopyIds() {
        return copyIds;
    }

    public void setCopyIds(List<String> copyIds) {
        this.copyIds = copyIds;
    }

    private List<String> copyIds = new ArrayList<>();


    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public String getIsbn() {
        return Isbn;
    }

    public void setIsbn(String isbn) {
        Isbn = isbn;
    }

    public int getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public TransactionStatus getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(TransactionStatus transactionStatus) {
        this.transactionStatus = transactionStatus;
    }
}