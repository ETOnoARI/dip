
package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Указываем статус ответа 404 Not Found
public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(Integer taskId) {
        super(String.format("Task with id %d not found", taskId));
    }
}