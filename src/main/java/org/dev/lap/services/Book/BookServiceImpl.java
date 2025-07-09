package org.dev.lap.services.Book;

import org.dev.lap.data.models.Book;
import org.dev.lap.data.models.BookCopy;
import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.data.models.TransactionStatus;
import org.dev.lap.data.repositories.BookCopyRepository;
import org.dev.lap.data.repositories.BookRepository;
import org.dev.lap.data.repositories.TransactionLogRepository;
import org.dev.lap.dtos.request.BookRequest;
import org.dev.lap.dtos.response.BookResponse;
import org.dev.lap.exceptions.BookNotAvailableException;
import org.dev.lap.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService{
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookCopyRepository bookCopyRepository;
    @Autowired
    private TransactionLogRepository transactionLogRepository;

    @Override
    public BookResponse addBook(BookRequest bookRequest) {
        Book book = BookMapper.mapToBookEntity(bookRequest);
        System.out.println("Available Quantity: " + bookRequest.getQuantityOfBook());
        List<String> bookCopyIds = new ArrayList<>();
        book = bookRepository.save(book);

        int quantity = bookRequest.getQuantityOfBook();
        List<BookCopy> bookCopies = new ArrayList<>();

        for (int i = 0; i < quantity; i++) {
            BookCopy bookCopy = new BookCopy();

            bookCopy.setBookId(book.getBookId());
            bookCopy.setCopyId(generateUniqueBookCopyId());
            bookCopy.setAvailable(true);
            bookCopies.add(bookCopy);
            bookCopyIds.add(bookCopy.getCopyId());
        }

        bookCopyRepository.saveAll(bookCopies);

        book.setAvailableQuantity(quantity);
        book.setCopyIds(bookCopyIds);

        book = bookRepository.save(book);
        book.setAvailableQuantity(quantity);
        book.setCopyIds(bookCopyIds);
        book = bookRepository.save(book);
        return BookMapper.mapToBookResponse(book);
    }

    @Override
    public List<BookResponse> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream()
                .map(book -> {
                    // Update available quantity based on available copies
                    List<BookCopy> availableCopies = bookCopyRepository.findAvailableCopiesByBookId(book.getBookId());
                    book.setAvailableQuantity(availableCopies.size());
                    return BookMapper.mapToBookResponse(book);
                })
                .collect(Collectors.toList());
    }

    @Override
    public BookResponse getBookById(String bookId) {
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            // Update available quantity based on available copies
            List<BookCopy> availableCopies = bookCopyRepository.findAvailableCopiesByBookId(book.getBookId());
            book.setAvailableQuantity(availableCopies.size());
            return BookMapper.mapToBookResponse(book);
        }
        return null;
    }

    private String generateUniqueBookCopyId() {
        return UUID.randomUUID().toString();
    }
}
