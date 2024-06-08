//  com/example/employeemanagement/exception/ProjectParticipantNotFoundException.java

package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Указываем статус ответа 404 Not Found
public class ProjectParticipantNotFoundException extends RuntimeException {

    public ProjectParticipantNotFoundException(Integer projectParticipantId) {
        super(String.format("Project Participant with id %d not found", projectParticipantId));
    }
}