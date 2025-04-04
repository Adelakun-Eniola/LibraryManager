package org.dev.lap.controllers.Borrower;

import org.dev.lap.data.repositories.UserRepository;
import org.dev.lap.dtos.request.UserLoginRequest;
import org.dev.lap.dtos.request.UserRequest;
import org.dev.lap.dtos.response.BookResponse;
import org.dev.lap.dtos.response.UserLoginResponse;
import org.dev.lap.dtos.response.UserResponse;
import org.dev.lap.exceptions.BookNotAvailableException;
import org.dev.lap.services.BorrowerPrincipal;
import org.dev.lap.services.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/register/user")
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRequest request) {
        UserResponse response = userService.registerUser(request);
        if (!response.isSuccessful()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/api/login/user")
    public ResponseEntity<UserLoginResponse> loginUser(@RequestBody UserLoginRequest userLoginRequest) {
        UserLoginResponse userLoginResponse = userService.loginUser(userLoginRequest);
        if (!userLoginResponse.isSuccess()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userLoginResponse);
        }
        return ResponseEntity.ok(userLoginResponse);
    }


    @PostMapping("/api/user/borrow/{bookId}")
    public ResponseEntity<String> borrowBook(@PathVariable String bookId) throws BookNotAvailableException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("SecurityContextHolder Authentication: " + authentication);

        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        BorrowerPrincipal borrowerPrincipal = (BorrowerPrincipal) authentication.getPrincipal();
        String borrowerId = borrowerPrincipal.getBorrowerId();

        System.out.println("Authenticated User ID: " + borrowerId);

        try {
            userService.borrowBook(bookId, borrowerId);
        } catch (BookNotAvailableException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }

        return ResponseEntity.ok("Book borrowed successfully");
    }

    @GetMapping("/api/user/getAllBooks")
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        List<BookResponse> books = userService.getAllBooks();
        return ResponseEntity.ok(books);
    }


}
