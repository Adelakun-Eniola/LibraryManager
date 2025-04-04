package org.dev.lap.services.Admin;

import org.dev.lap.dtos.request.AdminLoginRequest;
import org.dev.lap.dtos.request.AdminRegisterRequest;
import org.dev.lap.dtos.request.LibrarianLoginRegister;
import org.dev.lap.dtos.request.LibrarianRegisterRequest;
import org.dev.lap.dtos.response.AdminLoginResponse;
import org.dev.lap.dtos.response.AdminRegisterResponse;
import org.dev.lap.dtos.response.LibrarianLoginResponse;
import org.dev.lap.dtos.response.LibrarianRegisterResponse;
import org.dev.lap.exceptions.MissingFieldException;
import org.dev.lap.exceptions.UnmatchedException;

public interface AdminService {
    AdminRegisterResponse registerAdmin(AdminRegisterRequest request) throws MissingFieldException;

    AdminLoginResponse loginAdmin(AdminLoginRequest adminLoginRequest) throws MissingFieldException, UnmatchedException;

    LibrarianRegisterResponse registerLibrarian(LibrarianRegisterRequest request) throws MissingFieldException;

}
