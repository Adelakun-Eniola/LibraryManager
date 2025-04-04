package org.dev.lap.mapper.user;

import org.dev.lap.data.models.Borrower;
import org.dev.lap.data.models.Role;
import org.dev.lap.dtos.request.UserRequest;
import org.dev.lap.dtos.response.UserResponse;

public class UserMapper {

        // Convert UserRequest → User (Entity)
        public static Borrower toEntity(UserRequest request) {
            Borrower borrower = new Borrower();
            borrower.setFirstName(request.getFirstName());
            borrower.setLastName(request.getLastName());
            borrower.setPhoneNumber(request.getPhoneNumber());
            borrower.setEmailAddress(request.getEmailAddress());
            borrower.setPassword(request.getPassword());
            borrower.setRole(Role.USER);
            return borrower;
        }

        // Convert User (Entity) → UserResponse
        public static UserResponse toResponse(UserRequest user) {
            UserResponse response = new UserResponse();
            response.setRole(user.getRole().name());
            response.setMessage("User Registered Successfully!!!!");
            response.setSuccessful(true);
            return response;
        }

    public static UserResponse mapToUserResponse(Borrower borrower) {
        UserResponse response = new UserResponse();
        response.setRole(borrower.getRole() != null ? borrower.getRole().name() : "USER");
        response.setBorrowerId(borrower.getBorrowerId());
        response.setFirstName(borrower.getFirstName());
        response.setLastName(borrower.getLastName());
        response.setEmailAddress(borrower.getEmailAddress());
        response.setPhoneNumber(borrower.getPhoneNumber());
        response.setPassword(borrower.getPassword());
        response.setMessage("User registered successfully!");
        response.setSuccessful(true);
        return response;
    }



}

