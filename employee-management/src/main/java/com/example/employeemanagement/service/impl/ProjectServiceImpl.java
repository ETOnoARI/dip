// com/example/employeemanagement/service/ProjectServiceImpl.java

package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.ProjectNotFoundException;
import com.example.employeemanagement.model.Project;
import com.example.employeemanagement.repository.ProjectRepository;
import com.example.employeemanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    @Transactional
    public Project createProject(Project project) {
        // Проверки перед созданием проекта:
        // 1. Проверка наличия обязательных полей
        if (project.getName() == null || project.getName().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать название проекта.");
        }
        if (project.getDescription() == null || project.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать описание проекта.");
        }

        return projectRepository.save(project);
    }

    @Override
    public Project getProjectById(Integer id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteProject(Integer id) {
        // Проверки перед удалением:
        // 1. Проверка на наличие активных задач
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent() && !project.get().getProjectParticipants().isEmpty()) {
            throw new IllegalArgumentException("Невозможно удалить проект, у которого есть участники.");
        }

        projectRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Project updateProject(Project project) {
        // Проверки перед обновлением:
        // 1. Проверка существования проекта
        Optional<Project> existingProject = projectRepository.findById(project.getId());
        if (existingProject.isEmpty()) {
            throw new ProjectNotFoundException(project.getId());
        }

        // Проверки перед созданием проекта:
        // 1. Проверка наличия обязательных полей
        if (project.getName() == null || project.getName().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать название проекта.");
        }
        if (project.getDescription() == null || project.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать описание проекта.");
        }

        return projectRepository.save(project);

    }

    @Override
    public Page<Project> getAllProjects(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }
}