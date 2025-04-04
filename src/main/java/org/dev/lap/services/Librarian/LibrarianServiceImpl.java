package org.dev.lap.services.Librarian;

import org.dev.lap.data.models.Borrower;
import org.dev.lap.data.models.Librarian;
import org.dev.lap.data.repositories.LibrarianRepository;
import org.dev.lap.data.repositories.UserRepository;
import org.dev.lap.dtos.request.LibrarianLoginRegister;
import org.dev.lap.dtos.response.LibrarianLoginResponse;
import org.dev.lap.dtos.response.UserResponse;
import org.dev.lap.exceptions.MissingFieldException;
import org.dev.lap.exceptions.UnmatchedException;
import org.dev.lap.mapper.librarian.LibrarianLoginMapper;
import org.dev.lap.mapper.user.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LibrarianServiceImpl implements LibrarianService{

    @Autowired
    private LibrarianRepository librarianRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public LibrarianLoginResponse loginLibrarian(LibrarianLoginRegister librarianLoginRegister) throws MissingFieldException, UnmatchedException {
        if(librarianLoginRegister.getPhoneNumber() == null){
            throw new MissingFieldException("Phone Number Is Required");

        }
        Optional<Librarian> phoneNUmber = librarianRepository.findByPhoneNumber(librarianLoginRegister.getPhoneNumber());
        if(phoneNUmber.isEmpty()){
            throw new UnmatchedException("phone number does not match");
        }
        Optional<Librarian> librarianOptional = librarianRepository.findByEmailAddress(librarianLoginRegister.getEmailAddress());

        if (librarianOptional.isEmpty()) {
            return new LibrarianLoginResponse(false, "Librarian not found");
        }
        Librarian librarian = librarianOptional.get();
        return LibrarianLoginMapper.mapToLibrarianLoginResponse(librarian);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<Borrower> users = userRepository.findAll();
        return users.stream()
                .map(UserMapper::mapToUserResponse)
                .collect(Collectors.toList());
    }






}
