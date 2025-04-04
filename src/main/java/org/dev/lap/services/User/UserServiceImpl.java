package org.dev.lap.services.User;

import org.dev.lap.data.models.*;
import org.dev.lap.data.repositories.BookCopyRepository;
import org.dev.lap.data.repositories.BookRepository;
import org.dev.lap.data.repositories.TransactionLogRepository;
import org.dev.lap.data.repositories.UserRepository;
import org.dev.lap.dtos.request.UserLoginRequest;
import org.dev.lap.dtos.request.UserRequest;
import org.dev.lap.dtos.response.BookResponse;
import org.dev.lap.dtos.response.UserLoginResponse;
import org.dev.lap.dtos.response.UserResponse;
import org.dev.lap.exceptions.BookNotAvailableException;
import org.dev.lap.mapper.BookMapper;
import org.dev.lap.mapper.user.UserLoginMapper;
import org.dev.lap.mapper.user.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    public  UserRepository userRepository;
    @Autowired
    public PasswordEncoder passwordEncoder;
    @Autowired
    public BookCopyRepository bookCopyRepository;
    @Autowired
    public TransactionLogRepository transactionLogRepository;


    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse registerUser(UserRequest request) {
        if (userRepository.findByEmailAddress(request.getEmailAddress()).isPresent()) {
            return new UserResponse(false, "Email already exists!");
        }
        Borrower borrower = UserMapper.toEntity(request);
        borrower.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(borrower);
        return UserMapper.mapToUserResponse(borrower);
    }



    @Override
    public UserLoginResponse loginUser(UserLoginRequest userLoginRequest) {
        Optional<Borrower> userOptional = userRepository.findByEmailAddress(userLoginRequest.getEmailAddress());
        if (userOptional.isEmpty()) {
            UserLoginResponse response = new UserLoginResponse();
            response.setSuccess(false);
            response.setMessage("User not found");
            return response;
        }
        Borrower user = userOptional.get();
        if (!passwordEncoder.matches(userLoginRequest.getPassword(), user.getPassword())) {
            UserLoginResponse response = new UserLoginResponse();
            response.setSuccess(false);
            response.setMessage("Invalid credentials");
            return response;
        }

        return UserLoginMapper.mapToUserLoginResponse(user);
    }



    @Override
    public TransactionLog borrowBook(String bookId, String borrowerId) throws BookNotAvailableException {
        List<BookCopy> availableCopies = bookCopyRepository.findAvailableCopiesByBookId(bookId);
        if (availableCopies.isEmpty()) {
            throw new BookNotAvailableException("No available copies for borrowing for bookId: " + bookId);
        }
        BookCopy selectedCopy = null;
        Random random = new Random();
        while (!availableCopies.isEmpty()) {
            int randomIndex = random.nextInt(availableCopies.size());
            selectedCopy = availableCopies.get(randomIndex);

            if (selectedCopy.isAvailable()) {
                break;
            } else {
                availableCopies.remove(randomIndex);
            }
        }

        if (selectedCopy == null || !selectedCopy.isAvailable()) {
            throw new BookNotAvailableException("No available copies found after checking all.");
        }

        selectedCopy.setAvailable(false);
        selectedCopy.setBorrowerId(borrowerId);
        bookCopyRepository.save(selectedCopy);

        TransactionLog transactionLog = new TransactionLog();
        transactionLog.setBorrowerId(borrowerId);
        transactionLog.setBookCopyId(selectedCopy.getCopyId());
        transactionLog.setBorrowedTime(LocalDateTime.now());
        transactionLog.setDueDateTime(LocalDateTime.now().plusWeeks(4));
        transactionLog.setReturnDate(null);
        transactionLog.setTransactionStatus(String.valueOf(TransactionStatus.BORROWED));

        transactionLogRepository.save(transactionLog);

        return transactionLog;
    }

    @Override
    public List<BookResponse> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream()
                .map(BookMapper::mapToBookResponse)
                .collect(Collectors.toList()).reversed();
    }


}
