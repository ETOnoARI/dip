
package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Указываем статус ответа 404 Not Found
public class ProjectNotFoundException extends RuntimeException {

    public ProjectNotFoundException(Integer projectId) {
        super(String.format("Project with id %d not found", projectId));
    }
}