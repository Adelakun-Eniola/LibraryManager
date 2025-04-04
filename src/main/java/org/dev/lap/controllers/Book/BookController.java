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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor

@RequestMapping("/api")
public class BookController {
    @Autowired
    private BookService bookService;

    @PreAuthorize("hasRole('ROLE_LIBRARIAN')")
    @PostMapping("/register/book")
    public ResponseEntity<BookResponse> registerBook(@RequestBody BookRequest bookRequest) {
        System.out.println("Received Book Request: " + bookRequest);
        BookResponse response = bookService.addBook(bookRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


}
