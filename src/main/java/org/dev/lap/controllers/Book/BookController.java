package org.dev.lap.controllers.Book;

import lombok.AllArgsConstructor;
import org.dev.lap.data.repositories.BookRepository;
import org.dev.lap.dtos.request.BookRequest;
import org.dev.lap.dtos.response.BookResponse;
import org.dev.lap.services.Book.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/api")
public class BookController {
    @Autowired
    private BookService bookService;

    @PreAuthorize("hasRole('ROLE_LIBRARIAN')")
    @PostMapping("/register/book")
    public ResponseEntity<BookResponse> registerBook(@RequestBody BookRequest bookRequest) {
        try {
            System.out.println("Received Book Request: " + bookRequest);
            BookResponse response = bookService.addBook(bookRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/books")
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        try {
            List<BookResponse> books = bookService.getAllBooks();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/books/{bookId}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable String bookId) {
        try {
            BookResponse book = bookService.getBookById(bookId);
            if (book != null) {
                return ResponseEntity.ok(book);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
