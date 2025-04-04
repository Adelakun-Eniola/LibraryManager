package org.dev.lap.mapper.user;

import org.dev.lap.data.models.Borrower;
import org.dev.lap.data.models.Librarian;
import org.dev.lap.dtos.request.LibrarianLoginRegister;
import org.dev.lap.dtos.request.UserLoginRequest;
import org.dev.lap.dtos.response.LibrarianLoginResponse;
import org.dev.lap.dtos.response.UserLoginResponse;

public class UserLoginMapper {
    public static Borrower mapToUserLoginRequest(UserLoginRequest userLoginRequest){
        Borrower borrower = new Borrower();
        borrower.setEmailAddress(userLoginRequest.getEmailAddress());
        borrower.setPassword(userLoginRequest.getPassword());
        return borrower;
    }



    public static UserLoginResponse mapToUserLoginResponse(Borrower borrower){
        UserLoginResponse userLoginResponse = new UserLoginResponse();
        userLoginResponse.setSuccess(true);
        userLoginResponse.setMessage("Login Success");
        return userLoginResponse;
    }
}
