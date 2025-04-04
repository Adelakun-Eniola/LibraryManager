package org.dev.lap.services;

import org.dev.lap.data.models.Borrower;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

public class BorrowerPrincipal extends org.springframework.security.core.userdetails.User {

    private Borrower borrower;

    public BorrowerPrincipal(Borrower borrower) {
        super(borrower.getEmailAddress(), borrower.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        this.borrower = borrower;
    }

    public Borrower getBorrower() {
        return borrower;
    }

    public String getBorrowerId() {
        return borrower.getBorrowerId();
    }
}

