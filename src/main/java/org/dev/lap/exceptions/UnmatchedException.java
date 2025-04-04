package org.dev.lap.exceptions;

public class UnmatchedException extends Throwable {
    public UnmatchedException(String lastNameNotMatched) {
        super(lastNameNotMatched);
    }
}
