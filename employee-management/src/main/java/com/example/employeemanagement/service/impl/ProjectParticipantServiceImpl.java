// com/example/employeemanagement/service/ProjectParticipantServiceImpl.java

package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.ProjectParticipantNotFoundException;
import com.example.employeemanagement.model.ProjectParticipant;
import com.example.employeemanagement.repository.ProjectParticipantRepository;
import com.example.employeemanagement.service.ProjectParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ProjectParticipantServiceImpl implements ProjectParticipantService {

    @Autowired
    private ProjectParticipantRepository projectParticipantRepository;

    @Override
    @Transactional
    public ProjectParticipant createProjectParticipant(ProjectParticipant projectParticipant) {
        // Проверки перед созданием записи о участии в проекте:
        // 1. Проверка наличия обязательных полей
        if (projectParticipant.getProject() == null) {
            throw new IllegalArgumentException("Необходимо указать проект.");
        }
        if (projectParticipant.getEmployee() == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника.");
        }
        if (projectParticipant.getRole() == null || projectParticipant.getRole().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать роль в проекте.");
        }

        // 2. Проверка на уникальность роли в проекте (дополнительная проверка)
        if (projectParticipantRepository.existsByProjectIdAndRole(projectParticipant.getProject().getId(), projectParticipant.getRole())) {
            throw new IllegalArgumentException("В этом проекте уже есть участник с такой ролью.");
        }

        return projectParticipantRepository.save(projectParticipant);
    }

    @Override
    public ProjectParticipant getProjectParticipantById(Integer id) {
        return projectParticipantRepository.findById(id).orElseThrow(() -> new ProjectParticipantNotFoundException(id));
    }

    @Override
    public List<ProjectParticipant> getAllProjectParticipants() {
        return projectParticipantRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteProjectParticipant(Integer id) {
        projectParticipantRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProjectParticipant updateProjectParticipant(ProjectParticipant projectParticipant) {
        // Проверки перед обновлением:
        // 1. Проверка существования записи
        Optional<ProjectParticipant> existingProjectParticipant = projectParticipantRepository.findById(projectParticipant.getId());
        if (existingProjectParticipant.isEmpty()) {
            throw new ProjectParticipantNotFoundException(projectParticipant.getId());
        }

        if (projectParticipant.getProject() == null) {
            throw new IllegalArgumentException("Необходимо указать проект.");
        }
        if (projectParticipant.getEmployee() == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника.");
        }
        if (projectParticipant.getRole() == null || projectParticipant.getRole().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать роль в проекте.");
        }

        // 2. Проверка на уникальность роли в проекте (дополнительная проверка)
        if (projectParticipantRepository.existsByProjectIdAndRole(projectParticipant.getProject().getId(), projectParticipant.getRole())) {
            throw new IllegalArgumentException("В этом проекте уже есть участник с такой ролью.");
        }

        return projectParticipantRepository.save(projectParticipant);
    }

    @Override
    public Page<ProjectParticipant> getAllProjectParticipants(Pageable pageable) {
        return projectParticipantRepository.findAll(pageable);
    }
}