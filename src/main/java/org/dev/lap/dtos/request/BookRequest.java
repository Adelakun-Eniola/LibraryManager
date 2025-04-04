package org.dev.lap.dtos.request;

import lombok.Data;

@Data
public class BookRequest {
    private String bookName;
    private String bookAuthor;
    private String isbn;
    private int quantityOfBook;


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
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getQuantityOfBook() {
        return quantityOfBook;
    }

    public void setQuantityOfBook(int quantityOfBook) {
        this.quantityOfBook = quantityOfBook;
    }
}
