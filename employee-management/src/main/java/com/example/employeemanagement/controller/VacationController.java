package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.Vacation;
import com.example.employeemanagement.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер для управления отпусками сотрудников в REST API.
 *
 * Этот контроллер предоставляет API-endpoints для выполнения следующих операций:
 * - Получение списка всех отпусков
 * - Получение информации об отпуске по ID
 * - Создание нового отпуска
 * - Обновление данных существующего отпуска
 * - Удаление отпуска по ID
 */
@RestController
@RequestMapping("/vacations")
public class VacationController {

    // Инъекция сервиса для работы с отпусками
    private final VacationService vacationService;

    @Autowired
    public VacationController(VacationService vacationService) {
        this.vacationService = vacationService;
    }

    // Получение списка всех отпусков
    @GetMapping
    public List<Vacation> getAllVacations() {
        return vacationService.getAllVacations();
    }

    // Получение информации об отпуске по ID
    @GetMapping("/{id}")
    public Vacation getVacationById(@PathVariable("id") Long id) {
        return vacationService.getVacationById(Math.toIntExact(id));
    }

    // Создание нового отпуска
    @PostMapping
    public Vacation createVacation(@RequestBody Vacation vacation) {
        return vacationService.createVacation(vacation);
    }

    // Обновление данных существующего отпуска
    @PutMapping("/{id}")
    public Vacation updateVacation(@PathVariable("id") Long id, @RequestBody Vacation vacation) {
        return vacationService.updateVacation(id, vacation);
    }

    // Удаление отпуска по ID
    @DeleteMapping("/{id}")
    public void deleteVacation(@PathVariable("id") Long id) {
        vacationService.deleteVacation(Math.toIntExact(id));
    }
}