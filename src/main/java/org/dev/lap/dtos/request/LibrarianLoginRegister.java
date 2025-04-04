package org.dev.lap.dtos.request;

import lombok.Data;

@Data
public class LibrarianLoginRegister {
    private Long phoneNumber;
    private String emailAddress;

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
}
