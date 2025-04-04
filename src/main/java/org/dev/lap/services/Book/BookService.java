package org.dev.lap.services.Book;

import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.dtos.request.BookRequest;
import org.dev.lap.dtos.response.BookResponse;

public interface BookService {
    BookResponse addBook(BookRequest bookRequest);

//    TransactionLog borrowBook(String bookCopyId, String borrowerId);
}
