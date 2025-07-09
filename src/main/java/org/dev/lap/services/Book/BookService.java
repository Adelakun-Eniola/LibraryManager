package org.dev.lap.services.Book;

import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.dtos.request.BookRequest;
import org.dev.lap.dtos.response.BookResponse;

import java.util.List;

public interface BookService {
    BookResponse addBook(BookRequest bookRequest);
    
    List<BookResponse> getAllBooks();
    
    BookResponse getBookById(String bookId);

//    TransactionLog borrowBook(String bookCopyId, String borrowerId);
}
