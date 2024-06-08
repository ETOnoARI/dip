package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.Application;
import com.example.employeemanagement.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findAllByType(String type);

    List<Application> findAllByStatus(String status);

    List<Application> findAllByEmployee(Employee employee);

    List<Application> findAllByStatusAndType(String status, String type);

    Optional<Application> findTopByEmployeeIdOrderByDateDesc(Integer userId);

    Page<Application> findAllByType(String type, Pageable pageable);

    Page<Application> findAllByStatus(String status, Pageable pageable);

    Page<Application> findAllByEmployee(Employee employee, Pageable pageable);

    Page<Application> findAllByStatusAndType(String status, String type, Pageable pageable);
}