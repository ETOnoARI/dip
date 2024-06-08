// com/example/employeemanagement/service/ProjectParticipantService.java

package com.example.employeemanagement.service;

import com.example.employeemanagement.model.ProjectParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectParticipantService {
    ProjectParticipant createProjectParticipant(ProjectParticipant projectParticipant);
    ProjectParticipant getProjectParticipantById(Integer id);
    List<ProjectParticipant> getAllProjectParticipants();
    void deleteProjectParticipant(Integer id);
    ProjectParticipant updateProjectParticipant(ProjectParticipant projectParticipant);
    Page<ProjectParticipant> getAllProjectParticipants(Pageable pageable);
}