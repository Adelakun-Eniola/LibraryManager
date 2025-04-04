package org.dev.lap.dtos.response;

import lombok.Data;
import org.dev.lap.data.models.Role;


@Data
public class UserResponse {
    private boolean successful;
    private String message;

    private String borrowerId;

    public UserResponse(boolean b, String s) {
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private String role;

    public String getBorrowerId() {
        return borrowerId;
    }

    public void setBorrowerId(String borrowerId) {
        this.borrowerId = borrowerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String firstName;
    private String lastName;
    private Long phoneNumber;
    private String emailAddress;
    private String password;


    public UserResponse(boolean successful, String message, Role role) {
        this.successful = successful;
        this.message = message;
        this.role = (role != null) ? role.name() : null;

    }
    public boolean isSuccessful() {
        return successful;
    }

    public UserResponse() {

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }
}
