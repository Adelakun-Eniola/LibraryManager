package org.dev.lap.controllers.Admin;
import lombok.AllArgsConstructor;
import org.dev.lap.dtos.request.AdminLoginRequest;
import org.dev.lap.dtos.request.AdminRegisterRequest;
import org.dev.lap.dtos.request.LibrarianRegisterRequest;
import org.dev.lap.dtos.response.AdminLoginResponse;
import org.dev.lap.dtos.response.AdminRegisterResponse;
import org.dev.lap.dtos.response.LibrarianRegisterResponse;
import org.dev.lap.exceptions.MissingFieldException;
import org.dev.lap.exceptions.UnmatchedException;
import org.dev.lap.exceptions.ValidationException;
import org.dev.lap.services.Admin.AdminService;
import org.dev.lap.services.Admin.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<AdminRegisterResponse> registerAdmin(@RequestBody AdminRegisterRequest request) {
        try {
            AdminRegisterResponse response = adminService.registerAdmin(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (MissingFieldException e) {
            AdminRegisterResponse errorResponse = new AdminRegisterResponse();
            errorResponse.setMessage("Missing required fields: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            AdminRegisterResponse errorResponse = new AdminRegisterResponse();
            errorResponse.setMessage("Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> loginAdmin(@RequestBody AdminLoginRequest adminLoginRequest) {
        try {
            AdminLoginResponse response = adminService.loginAdmin(adminLoginRequest);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (MissingFieldException | UnmatchedException e) {
            AdminLoginResponse errorResponse = new AdminLoginResponse();
            errorResponse.setMessage("Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        } catch (Exception e) {
            AdminLoginResponse errorResponse = new AdminLoginResponse();
            errorResponse.setMessage("Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/librarian_registration")
    public ResponseEntity<LibrarianRegisterResponse> registerLibrarian(@RequestBody LibrarianRegisterRequest librarianRegisterRequest) {
        try {
            LibrarianRegisterResponse librarianRegisterResponse = adminService.registerLibrarian(librarianRegisterRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(librarianRegisterResponse);
        } catch (MissingFieldException e) {
            LibrarianRegisterResponse errorResponse = new LibrarianRegisterResponse();
            errorResponse.setMessage("Missing required fields: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            LibrarianRegisterResponse errorResponse = new LibrarianRegisterResponse();
            errorResponse.setMessage("Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
