package org.dev.lap.controllers.Librarian;

import org.dev.lap.dtos.request.AdminLoginRequest;
import org.dev.lap.dtos.request.LibrarianLoginRegister;
import org.dev.lap.dtos.response.AdminLoginResponse;
import org.dev.lap.dtos.response.LibrarianLoginResponse;
import org.dev.lap.dtos.response.UserResponse;
import org.dev.lap.exceptions.MissingFieldException;
import org.dev.lap.exceptions.UnmatchedException;
import org.dev.lap.services.Librarian.LibrarianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/librarian")
public class LibrarianController {
    @Autowired
    private LibrarianService librarianService;
    @PostMapping("/librarian_login")
    public ResponseEntity<LibrarianLoginResponse> loginLibrarian(@RequestBody LibrarianLoginRegister librarianLoginRegister) throws MissingFieldException, UnmatchedException {
        LibrarianLoginResponse response = librarianService.loginLibrarian(librarianLoginRegister);
        return  ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = librarianService.getAllUsers();
        return ResponseEntity.ok(users);
    }


}
