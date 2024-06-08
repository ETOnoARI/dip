//  com/example/employeemanagement/controller/ApplicationController.java

package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.Application;
import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.service.ApplicationService;
import com.example.employeemanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody @Valid Application application, BindingResult bindingResult) {
        //  Получаем  сотрудника  из  заявки
        Employee employee = application.getEmployee();

        //  Проверяем  существование  сотрудника
        if (employee != null && employee.getId() != null) {
            Employee existingEmployee = employeeService.getEmployeeById(employee.getId());
            application.setEmployee(existingEmployee);
        } else {
            throw new IllegalArgumentException("Необходимо указать сотрудника для заявки.");
        }

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Application createdApplication = applicationService.createApplication(application);
        return new ResponseEntity<>(createdApplication, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Integer id) {
        Application application = applicationService.getApplicationById(id);
        if (application != null) {
            return new ResponseEntity<>(application, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> applications = applicationService.getAllApplications();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Application>> getApplicationsByType(@PathVariable String type) {
        List<Application> applications = applicationService.getApplicationsByType(type);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Application>> getApplicationsByStatus(@PathVariable String status) {
        List<Application> applications = applicationService.getApplicationsByStatus(status);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Application>> getApplicationsByEmployee(@PathVariable Integer employeeId) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        if (employee != null) {
            List<Application> applications = applicationService.getApplicationsByEmployee(employee);
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}/type/{type}")
    public ResponseEntity<List<Application>> getApplicationsByStatusAndType(@PathVariable String status, @PathVariable String type) {
        List<Application> applications = applicationService.getApplicationsByStatusAndType(status, type);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping(params = "page")
    public ResponseEntity<Page<Application>> getAllApplications(Pageable pageable) {
        Page<Application> applications = applicationService.getAllApplications(pageable);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/type/{type}?page")
    public ResponseEntity<Page<Application>> getApplicationsByType(@PathVariable String type, Pageable pageable) {
        Page<Application> applications = applicationService.getApplicationsByType(type, pageable);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/status/{status}?page")
    public ResponseEntity<Page<Application>> getApplicationsByStatus(@PathVariable String status, Pageable pageable) {
        Page<Application> applications = applicationService.getApplicationsByStatus(status, pageable);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/employee/{employeeId}?page")
    public ResponseEntity<Page<Application>> getApplicationsByEmployee(@PathVariable Integer employeeId, Pageable pageable) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        if (employee != null) {
            Page<Application> applications = applicationService.getApplicationsByEmployee(employee, pageable);
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}/type/{type}?page")
    public ResponseEntity<Page<Application>> getApplicationsByStatusAndType(@PathVariable String status, @PathVariable String type, Pageable pageable) {
        Page<Application> applications = applicationService.getApplicationsByStatusAndType(status, type, pageable);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Integer id) {
        applicationService.deleteApplication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Application> updateApplication(@RequestBody @Valid Application application, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Application updatedApplication = applicationService.updateApplication(application);
        return new ResponseEntity<>(updatedApplication, HttpStatus.OK);
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Application> approveApplication(@PathVariable Integer id) {
        Application approvedApplication = applicationService.approveApplication(id);
        return new ResponseEntity<>(approvedApplication, HttpStatus.OK);
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Application> rejectApplication(@PathVariable Integer id) {
        Application rejectedApplication = applicationService.rejectApplication(id);
        return new ResponseEntity<>(rejectedApplication, HttpStatus.OK);
    }
}