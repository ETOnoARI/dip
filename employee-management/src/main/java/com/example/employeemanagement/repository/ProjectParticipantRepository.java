package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.ProjectParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectParticipantRepository extends JpaRepository<ProjectParticipant, Integer> {
    boolean existsByProjectIdAndRole(Integer projectId, String role);
}