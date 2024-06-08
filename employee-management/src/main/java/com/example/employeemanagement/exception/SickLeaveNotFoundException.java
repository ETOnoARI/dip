// com/example/employeemanagement/exception/SickLeaveNotFoundException.java

package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Указываем статус ответа 404 Not Found
public class SickLeaveNotFoundException extends RuntimeException {

    public SickLeaveNotFoundException(Integer sickLeaveId) {
        super(String.format("Sick Leave with id %d not found", sickLeaveId));
    }
}