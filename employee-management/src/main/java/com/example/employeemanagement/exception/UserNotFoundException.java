//  com/example/employeemanagement/exception/UserNotFoundException.java

package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Integer userId) {
        super(String.format("User with id %d not found", userId));
    }

    public UserNotFoundException(String email) {
        super(String.format("User with email %s not found", email));
    }
}