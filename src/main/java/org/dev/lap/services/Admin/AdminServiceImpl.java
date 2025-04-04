package org.dev.lap.services.Admin;

import lombok.RequiredArgsConstructor;
import org.dev.lap.data.models.Admin;
import org.dev.lap.data.models.Librarian;
import org.dev.lap.data.models.Role;
import org.dev.lap.data.repositories.AdminRepository;
import org.dev.lap.data.repositories.LibrarianRepository;
import org.dev.lap.dtos.request.AdminLoginRequest;
import org.dev.lap.dtos.request.AdminRegisterRequest;
import org.dev.lap.dtos.request.LibrarianLoginRegister;
import org.dev.lap.dtos.request.LibrarianRegisterRequest;
import org.dev.lap.dtos.response.AdminLoginResponse;
import org.dev.lap.dtos.response.AdminRegisterResponse;
import org.dev.lap.dtos.response.LibrarianLoginResponse;
import org.dev.lap.dtos.response.LibrarianRegisterResponse;
import org.dev.lap.exceptions.DuplicateEmailException;
import org.dev.lap.exceptions.MissingFieldException;
import org.dev.lap.exceptions.UnmatchedException;
import org.dev.lap.mapper.admin.AdminMapper;
import org.dev.lap.mapper.librarian.LibrarianMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    @Autowired
    private LibrarianRepository librarianRepository;
    @Autowired
    private AdminRepository adminRepository;



    @Override
    public AdminRegisterResponse registerAdmin(AdminRegisterRequest request) throws MissingFieldException {
        if (request.getEmailAddress() == null || request.getEmailAddress().isEmpty()) {
            throw new MissingFieldException("Email is required");
        }
        if (request.getFirstName()== null || request.getFirstName().isEmpty()) {
            throw new MissingFieldException("FirstName is required");
        }
        if (request.getLastName()== null || request.getLastName().isEmpty()) {
            throw new MissingFieldException("LastName is required");
        }
        if (adminRepository.findAdminByEmailAddress(request.getEmailAddress()).isPresent()) {
            throw new DuplicateEmailException("User with this email already exists.");
        }
        Admin admin = AdminMapper.mapToAdmin(request);
        admin.setRole(Role.ADMIN);
        Admin savedAdmin = adminRepository.save(admin);
        return AdminMapper.mapToAdminResponse(savedAdmin);
    }


    @Override
    public AdminLoginResponse loginAdmin(AdminLoginRequest request) throws MissingFieldException, UnmatchedException {
        if (request.getLastName()== null || request.getLastName().isEmpty()) {
            throw new MissingFieldException("LastName is required");
        }
        if(!Objects.equals(request.getLastName(), request.getLastName())){
            throw new UnmatchedException("Name does not match!!!");
        }
        Optional<Admin> adminOptional = adminRepository.findAdminByEmailAddress(request.getEmailAddress());
        if (adminOptional.isEmpty()) {
            return new AdminLoginResponse(false, "User not found.");
        }
        Admin admin = adminOptional.get();
        return new AdminLoginResponse(true, "Login successful.");
    }

    @Override
    public LibrarianRegisterResponse registerLibrarian(LibrarianRegisterRequest request) throws MissingFieldException {
        if (request.getFirstName()== null || request.getFirstName().isEmpty()) {
            throw new MissingFieldException("FirstName is required");
        }
        if (request.getLastName()== null || request.getLastName().isEmpty()) {
            throw new MissingFieldException("LastName is required");
        }
        if (request.getPhoneNumber()== null ) {
            throw new MissingFieldException("Phone Number is required");
        }
        if(request.getEmailAddress() ==null || request.getEmailAddress().isEmpty()){
            throw new MissingFieldException("Email Required");
        }

        Optional<Librarian> librarianOptional = librarianRepository.findByEmailAddress(request.getEmailAddress());

        if (librarianOptional.isPresent()) {
            throw new DuplicateEmailException("Email address already in use: " + request.getEmailAddress());
        }

            Librarian librarian = LibrarianMapper.mapToLibrarianSignUpRequest(request);
        librarian.setRole(Role.LIBRARIAN);
        Librarian savedLibrarian = librarianRepository.save(librarian);
        savedLibrarian.getRole().name();
        return LibrarianMapper.mapToLibrarianSignUpResponse(savedLibrarian);
    }

}
