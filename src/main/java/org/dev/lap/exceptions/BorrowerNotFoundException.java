package org.dev.lap.exceptions;

public class BorrowerNotFoundException extends RuntimeException {
    public BorrowerNotFoundException(String userNotFound) {
        super(userNotFound);
    }
}
