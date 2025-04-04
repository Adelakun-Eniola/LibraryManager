package org.dev.lap.services.Librarian;

import org.dev.lap.dtos.request.LibrarianLoginRegister;
import org.dev.lap.dtos.response.LibrarianLoginResponse;
import org.dev.lap.dtos.response.UserResponse;
import org.dev.lap.exceptions.MissingFieldException;
import org.dev.lap.exceptions.UnmatchedException;

import java.util.List;

public interface LibrarianService {
    LibrarianLoginResponse loginLibrarian(LibrarianLoginRegister librarianLoginRegister) throws MissingFieldException, UnmatchedException;

    List<UserResponse> getAllUsers();
}
