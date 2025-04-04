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
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;


    @PostMapping("/register")
    public ResponseEntity<AdminRegisterResponse> registerAdmin(@RequestBody AdminRegisterRequest request) throws MissingFieldException {
        AdminRegisterResponse response = adminService.registerAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> loginAdmin(@RequestBody AdminLoginRequest adminLoginRequest) throws MissingFieldException, UnmatchedException {
        AdminLoginResponse response = adminService.loginAdmin(adminLoginRequest);
        return  ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/librarian_registration")
    public ResponseEntity<LibrarianRegisterResponse> registerLibrarian(@RequestBody LibrarianRegisterRequest librarianRegisterRequest) throws MissingFieldException {
        LibrarianRegisterResponse librarianRegisterResponse = adminService.registerLibrarian(librarianRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(librarianRegisterResponse);
    }
}
