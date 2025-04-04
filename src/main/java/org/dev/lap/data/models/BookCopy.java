package org.dev.lap.data.models;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class BookCopy {
    @Id
    private String copyId;
    private String bookId;
    private String borrowerId;
    private boolean isAvailable;

    public String getBorrowerId() {
        return borrowerId;
    }

    public void setBorrowerId(String borrowerId) {
        this.borrowerId = borrowerId;
    }



    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }



    public String getCopyId() {
        return copyId;
    }

    public void setCopyId(String copyId) {
        this.copyId = copyId;
    }


    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
