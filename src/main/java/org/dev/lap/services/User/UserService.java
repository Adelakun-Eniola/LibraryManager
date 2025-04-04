package org.dev.lap.services.User;

import org.dev.lap.data.models.TransactionLog;
import org.dev.lap.dtos.request.UserLoginRequest;
import org.dev.lap.dtos.request.UserRequest;
import org.dev.lap.dtos.response.BookResponse;
import org.dev.lap.dtos.response.UserLoginResponse;
import org.dev.lap.dtos.response.UserResponse;
import org.dev.lap.exceptions.BookNotAvailableException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    UserLoginResponse loginUser(UserLoginRequest userLoginRequest);

    @Transactional
    TransactionLog borrowBook(String bookCopyId, String borrowerId) throws BookNotAvailableException;

    List<BookResponse> getAllBooks();
}
