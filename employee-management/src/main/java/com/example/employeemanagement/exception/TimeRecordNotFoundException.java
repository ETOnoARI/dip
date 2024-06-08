//  com/example/employeemanagement/exception/TimeRecordNotFoundException.java

package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TimeRecordNotFoundException extends RuntimeException {

    public TimeRecordNotFoundException(Integer timeRecordId) {
        super(String.format("Time Record with id %d not found", timeRecordId));
    }
}