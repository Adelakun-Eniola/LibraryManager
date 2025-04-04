package org.dev.lap.exceptions;

public class MissingFieldException extends Throwable {
    public MissingFieldException(String fieldRequired) {
        super(fieldRequired);
    }
}
