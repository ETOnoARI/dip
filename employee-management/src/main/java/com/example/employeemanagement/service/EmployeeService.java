//  com/example/employeemanagement/service/EmployeeService.java

package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    Employee createEmployee(Employee employee);
    Employee getEmployeeById(Integer id);
    List<Employee> getAllEmployees();
    void deleteEmployee(Integer id);
    Employee updateEmployee(Employee employee);
    Page<Employee> getAllEmployees(Pageable pageable);
    List<Employee> findByNameContaining(String name);
}