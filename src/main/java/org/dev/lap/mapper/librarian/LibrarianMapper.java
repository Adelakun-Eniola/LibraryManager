package org.dev.lap.mapper.librarian;

import org.dev.lap.data.models.Librarian;
import org.dev.lap.data.models.Role;
import org.dev.lap.dtos.request.LibrarianRegisterRequest;
import org.dev.lap.dtos.response.LibrarianLoginResponse;
import org.dev.lap.dtos.response.LibrarianRegisterResponse;

public class LibrarianMapper {
    public static Librarian mapToLibrarianSignUpRequest(LibrarianRegisterRequest librarianRegisterRequest){
        Librarian librarian = new Librarian();
        librarian.setFirstName(librarianRegisterRequest.getFirstName());
        librarian.setLastName(librarianRegisterRequest.getLastName());
        librarian.setPhoneNumber(librarianRegisterRequest.getPhoneNumber());
        librarian.setEmailAddress(librarianRegisterRequest.getEmailAddress());

        return librarian;
    }

    public static LibrarianRegisterResponse mapToLibrarianSignUpResponse(Librarian librarian){
        LibrarianRegisterResponse librarianRegisterResponse = new LibrarianRegisterResponse();
        librarianRegisterResponse.setData(librarian.getLibrarianId());
        librarianRegisterResponse.setMessage("Registered Successfully");
        librarianRegisterResponse.setRole(librarian.getRole().name());
        return librarianRegisterResponse;
    }
}
