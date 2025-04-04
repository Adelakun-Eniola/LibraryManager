package org.dev.lap.mapper;
import  org.dev.lap.data.models.Book;
import org.dev.lap.data.models.TransactionStatus;
import org.dev.lap.dtos.request.BookRequest;
import org.dev.lap.dtos.response.BookResponse;
import  org.dev.lap.data.models.BookCopy;

import java.util.List;
import  java.util.ArrayList;
public class BookMapper {

    public static Book mapToBookEntity(BookRequest bookRequest) {
        Book book = new Book();

        book.setBookName(bookRequest.getBookName());
        book.setBookAuthor(bookRequest.getBookAuthor());
        book.setIsbn(bookRequest.getIsbn());

        int quantity = book.getAvailableQuantity();
        book.setAvailableQuantity(quantity);

        book.setTransactionStatus(TransactionStatus.AVAILABLE);

        // Create BookCopies based on the quantity
        List<BookCopy> bookCopies = new ArrayList<>();
        for (int i = 0; i < quantity; i++) {
            BookCopy bookCopy = new BookCopy();
            bookCopy.setAvailable(true);
            bookCopy.setBookId(book.getBookId()); // Assigning the single book ID
            bookCopies.add(bookCopy);
        }
        book.setAvailableQuantity(book.getAvailableQuantity());
        return book;
    }

    public static BookResponse mapToBookResponse(Book book) {
        BookResponse response = new BookResponse();
        response.setBookId(book.getBookId());
        response.setBookName(book.getBookName());
        response.setBookAuthor(book.getBookAuthor());
        response.setIsbn(book.getIsbn());
        response.setAvailableQuantity(book.getAvailableQuantity());
        response.setTransactionStatus(book.getTransactionStatus());
        return response;
    }
}
