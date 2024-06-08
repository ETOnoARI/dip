package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.EmployeeNotFoundException;
import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public Employee createEmployee(Employee employee) {
        // Проверки перед созданием сотрудника:
        // 1. Проверка наличия обязательных полей
        if (employee.getName() == null || employee.getName().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать имя сотрудника.");
        }
        if (employee.getPosition() == null || employee.getPosition().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать должность сотрудника.");
        }
        if (employee.getDepartment() == null || employee.getDepartment().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать отдел сотрудника.");
        }
        if (employee.getHireDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату приема на работу.");
        }
        if (employee.getStatus() == null || employee.getStatus().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать статус сотрудника.");
        }
        if (employee.getPhone() == null || employee.getPhone().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать телефон сотрудника.");
        }
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать email сотрудника.");
        }
        if (employee.getBirthDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату рождения.");
        }
        if (employee.getAddress() == null || employee.getAddress().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать адрес сотрудника.");
        }
        if (employee.getSalary() == null) {
            throw new IllegalArgumentException("Необходимо указать оклад сотрудника.");
        }

        // 2. Проверка формата даты (не в прошлом?)
        if (employee.getHireDate().before(new Date())) {
            throw new IllegalArgumentException("Дата приема на работу не может быть в прошлом.");
        }

        // 3. Проверка формата даты рождения (не в будущем?)
        if (employee.getBirthDate().after(new Date())) {
            throw new IllegalArgumentException("Дата рождения не может быть в будущем.");
        }

        // 4. Проверка формата телефона (реализуйте проверку по вашему требованию)
        if (!employee.getPhone().matches("\\+?\\d{1,3} ?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}")) {
            throw new IllegalArgumentException("Некорректный формат телефона.");
        }

        // 5. Проверка формата email (реализуйте проверку по вашему требованию)
        if (!employee.getEmail().matches("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")) {
            throw new IllegalArgumentException("Некорректный формат email.");
        }

        return employeeRepository.save(employee);
    }

    @Override
    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Employee> findByNameContaining(String name) {
        return employeeRepository.findByNameContaining(name);
    }

    @Override
    @Transactional
    public void deleteEmployee(Integer id) {
        // Проверки перед удалением:
        // 1. Проверка на наличие заявок на отпуск
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent() && !employee.get().getVacations().isEmpty()) {
            throw new IllegalArgumentException("Невозможно удалить сотрудника, у которого есть заявки на отпуск.");
        }

        // 2. Проверка на наличие задач
        if (employee.isPresent() && !employee.get().getTasks().isEmpty()) {
            throw new IllegalArgumentException("Невозможно удалить сотрудника, у которого есть задачи.");
        }

        employeeRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Employee updateEmployee(Employee employee) {
        // Проверки перед обновлением:
        // 1. Проверка существования сотрудника
        Optional<Employee> existingEmployee = employeeRepository.findById(employee.getId());
        if (existingEmployee.isEmpty()) {
            throw new EmployeeNotFoundException(employee.getId());
        }


        if (employee.getName() == null || employee.getName().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать имя сотрудника.");
        }

        if (employee.getPosition() == null || employee.getPosition().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать должность сотрудника.");
        }

        if (employee.getDepartment() == null || employee.getDepartment().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать отдел сотрудника.");
        }

        if (employee.getHireDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату приема на работу.");
        }

        // 2.5 Проверка статуса
        if (employee.getStatus() == null || employee.getStatus().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать статус сотрудника.");
        }

        // 2.6 Проверка телефона
        if (employee.getPhone() == null || employee.getPhone().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать телефон сотрудника.");
        }

        // 2.7 Проверка email
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать email сотрудника.");
        }

        // 2.8 Проверка даты рождения
        if (employee.getBirthDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату рождения.");
        }

        // 2.9 Проверка адреса
        if (employee.getAddress() == null || employee.getAddress().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать адрес сотрудника.");
        }

        // 2.10 Проверка оклада
        if (employee.getSalary() == null) {
            throw new IllegalArgumentException("Необходимо указать оклад сотрудника.");
        }

        // 2.11 Проверка формата даты приема на работу (не в прошлом?)
        if (employee.getHireDate().before(new Date())) {
            throw new IllegalArgumentException("Дата приема на работу не может быть в прошлом.");
        }

        // 2.12 Проверка формата даты рождения (не в будущем?)
        if (employee.getBirthDate().after(new Date())) {
            throw new IllegalArgumentException("Дата рождения не может быть в будущем.");
        }

        // 2.13 Проверка формата телефона (реализуйте проверку по вашему требованию)
        if (!employee.getPhone().matches("\\+?\\d{1,3} ?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}")) {
            throw new IllegalArgumentException("Некорректный формат телефона.");
        }

        // 2.14 Проверка формата email (реализуйте проверку по вашему требованию)
        if (!employee.getEmail().matches("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")) {
            throw new IllegalArgumentException("Некорректный формат email.");
        }

        return employeeRepository.save(employee);
    }

    @Override
    public Page<Employee> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }
}