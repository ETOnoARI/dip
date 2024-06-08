//  com/example/employeemanagement/service/ApplicationService.java

package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Application;
import com.example.employeemanagement.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ApplicationService {
    Application createApplication(Application application);
    Application getApplicationById(Integer id);
    List<Application> getAllApplications();
    List<Application> getApplicationsByType(String type);
    List<Application> getApplicationsByStatus(String status);
    List<Application> getApplicationsByEmployee(Employee employee);
    List<Application> getApplicationsByStatusAndType(String status, String type);
    Page<Application> getAllApplications(Pageable pageable);
    Page<Application> getApplicationsByType(String type, Pageable pageable);
    Page<Application> getApplicationsByStatus(String status, Pageable pageable);
    Page<Application> getApplicationsByEmployee(Employee employee, Pageable pageable);
    Page<Application> getApplicationsByStatusAndType(String status, String type, Pageable pageable);
    void deleteApplication(Integer id);
    Application updateApplication(Application application);
    Application approveApplication(Integer id);
    Application rejectApplication(Integer id);
    Optional<Application> getLastApplicationByUser(Integer userId);
}