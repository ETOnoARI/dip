package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.ApplicationNotFoundException;
import com.example.employeemanagement.exception.EmployeeNotFoundException;
import com.example.employeemanagement.model.Application;
import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.ApplicationRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public Application createApplication(Application application) {
        // Проверки перед созданием заявки:
        // 1. Проверка существования сотрудника
        Employee employee = application.getEmployee();
        if (employee == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника для заявки.");
        }

        // 2. Проверка статуса сотрудника (работает ли он сейчас?)
        if (!employee.getStatus().equals("working")) {
            throw new IllegalArgumentException("Сотрудник не работает, не может подать заявление.");
        }

        // 3. Проверка типа заявки (поддерживается ли он?)
        if (!Arrays.asList("promotion", "memo", "resignation").contains(application.getType())) {
            throw new IllegalArgumentException("Неверный тип заявки.");
        }

        // 4. Проверка даты (не в прошлом?)
        if (application.getDate().before(new Date())) {
            throw new IllegalArgumentException("Дата заявки не может быть в прошлом.");
        }

        // 5. Проверка наличия всех обязательных полей
        if (application.getType().equals("promotion") && (application.getContent() == null || application.getContent().isEmpty())) {
            throw new IllegalArgumentException("Для заявки на повышение необходимо заполнить поле 'Содержание'.");
        }
        if (application.getType().equals("memo") && (application.getContent() == null || application.getContent().isEmpty() ||
                application.getRecipient() == null || application.getRecipient().isEmpty())) {
            throw new IllegalArgumentException("Для служебной записки необходимо заполнить поля 'Содержание' и 'Адресат'.");
        }
        if (application.getType().equals("resignation") && (application.getContent() == null || application.getContent().isEmpty())) {
            throw new IllegalArgumentException("Для заявления на увольнение необходимо заполнить поле 'Содержание'.");
        }

        return applicationRepository.save(application);
    }

    @Override
    public Application getApplicationById(Integer id) {
        return applicationRepository.findById(id).orElseThrow(() -> new ApplicationNotFoundException(id));
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public List<Application> getApplicationsByType(String type) {
        return applicationRepository.findAllByType(type);
    }

    @Override
    public List<Application> getApplicationsByStatus(String status) {
        return applicationRepository.findAllByStatus(status);
    }

    @Override
    public List<Application> getApplicationsByEmployee(Employee employee) {
        return applicationRepository.findAllByEmployee(employee);
    }

    @Override
    public List<Application> getApplicationsByStatusAndType(String status, String type) {
        return applicationRepository.findAllByStatusAndType(status, type);
    }

    @Override
    public Page<Application> getAllApplications(Pageable pageable) {
        return applicationRepository.findAll(pageable);
    }

    @Override
    public Page<Application> getApplicationsByType(String type, Pageable pageable) {
        return applicationRepository.findAllByType(type, pageable);
    }

    @Override
    public Page<Application> getApplicationsByStatus(String status, Pageable pageable) {
        return applicationRepository.findAllByStatus(status, pageable);
    }

    @Override
    public Page<Application> getApplicationsByEmployee(Employee employee, Pageable pageable) {
        return applicationRepository.findAllByEmployee(employee, pageable);
    }

    @Override
    public Page<Application> getApplicationsByStatusAndType(String status, String type, Pageable pageable) {
        return applicationRepository.findAllByStatusAndType(status, type, pageable);
    }

    @Override
    @Transactional
    public void deleteApplication(Integer id) {
        applicationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Application updateApplication(Application application) {

        Employee employee = application.getEmployee();
        if (employee == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника для заявки.");
        }

        if (!employee.getStatus().equals("working")) {
            throw new IllegalArgumentException("Сотрудник не работает, не может подать заявление.");
        }

        if (!Arrays.asList("promotion", "memo", "resignation").contains(application.getType())) {
            throw new IllegalArgumentException("Неверный тип заявки.");
        }

        if (application.getDate().before(new Date())) {
            throw new IllegalArgumentException("Дата заявки не может быть в прошлом.");
        }

        if (application.getType().equals("promotion") && (application.getContent() == null || application.getContent().isEmpty())) {
            throw new IllegalArgumentException("Для заявки на повышение необходимо заполнить поле 'Содержание'.");
        }
        if (application.getType().equals("memo") && (application.getContent() == null || application.getContent().isEmpty() ||
                application.getRecipient() == null || application.getRecipient().isEmpty())) {
            throw new IllegalArgumentException("Для служебной записки необходимо заполнить поля 'Содержание' и 'Адресат'.");
        }
        if (application.getType().equals("resignation") && (application.getContent() == null || application.getContent().isEmpty())) {
            throw new IllegalArgumentException("Для заявления на увольнение необходимо заполнить поле 'Содержание'.");
        }

        return applicationRepository.save(application);
    }

    @Override
    @Transactional
    public Application approveApplication(Integer id) {
        Application application = applicationRepository.findById(id).orElseThrow(() -> new ApplicationNotFoundException(id));
        application.setStatus("approved");
        return applicationRepository.save(application);
    }

    @Override
    @Transactional
    public Application rejectApplication(Integer id) {
        Application application = applicationRepository.findById(id).orElseThrow(() -> new ApplicationNotFoundException(id));
        application.setStatus("rejected");
        return applicationRepository.save(application);
    }

    @Override
    public Optional<Application> getLastApplicationByUser(Integer userId) {
        return applicationRepository.findTopByEmployeeIdOrderByDateDesc(userId);
    }
}