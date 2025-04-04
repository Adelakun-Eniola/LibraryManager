package org.dev.lap.dtos.request;

import lombok.Data;


public class UserLoginRequest {
    private String emailAddress;
    private String password;

    public  String getEmailAddress() {
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
}
