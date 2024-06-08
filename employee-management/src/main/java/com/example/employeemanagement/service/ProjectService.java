// com/example/employeemanagement/service/ProjectService.java

package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectService {
    Project createProject(Project project);
    Project getProjectById(Integer id);
    List<Project> getAllProjects();
    void deleteProject(Integer id);
    Project updateProject(Project project);
    Page<Project> getAllProjects(Pageable pageable);
}