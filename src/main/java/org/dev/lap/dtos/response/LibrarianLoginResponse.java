package org.dev.lap.dtos.response;

import lombok.Data;

@Data
public class LibrarianLoginResponse {
    private boolean isSuccessful;
    private Object message;

    public LibrarianLoginResponse(boolean isSuccessful, String message) {
        this.isSuccessful = isSuccessful;
        this.message = message;
    }

    public LibrarianLoginResponse() {

    }

    public boolean isSuccessful() {
        return isSuccessful;
    }

    public void setSuccessful(boolean successful) {
        isSuccessful = successful;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }
}
