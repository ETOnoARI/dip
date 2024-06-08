
package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Указываем статус ответа 404 Not Found
public class ApplicationNotFoundException extends RuntimeException {

    public ApplicationNotFoundException(Integer applicationId) {
        super(String.format("Application with id %d not found", applicationId));
    }
}