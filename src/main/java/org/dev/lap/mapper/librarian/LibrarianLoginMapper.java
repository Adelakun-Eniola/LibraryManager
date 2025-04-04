package org.dev.lap.mapper.librarian;

import org.dev.lap.data.models.Librarian;
import org.dev.lap.dtos.request.LibrarianLoginRegister;
import org.dev.lap.dtos.response.LibrarianLoginResponse;

public class LibrarianLoginMapper {

    public static Librarian mapToLibraryLoginRequest(LibrarianLoginRegister librarianLoginRegister){
        Librarian librarian = new Librarian();
        librarian.setPhoneNumber(librarianLoginRegister.getPhoneNumber());
        librarian.setEmailAddress(librarianLoginRegister.getEmailAddress());
        return librarian;
    }

    public static LibrarianLoginResponse mapToLibrarianLoginResponse(Librarian librarian){
        LibrarianLoginResponse librarianLoginResponse = new LibrarianLoginResponse();
        librarianLoginResponse.setSuccessful(true);
        librarianLoginResponse.setMessage("Login Success");
        return librarianLoginResponse;
    }
}
