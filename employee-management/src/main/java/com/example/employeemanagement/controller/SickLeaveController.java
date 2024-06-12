package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.SickLeave;
import com.example.employeemanagement.service.SickLeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер для управления больничными листами сотрудников в REST API.
 *
 * Этот контроллер предоставляет API-endpoints для выполнения следующих операций:
 * - Получение списка всех больничных листов
 * - Получение информации о больничном листе по ID
 * - Создание нового больничного листа
 * - Обновление данных существующего больничного листа
 * - Удаление больничного листа по ID
 */
@RestController
@RequestMapping("/sickleaves")
public class SickLeaveController {

    // Инъекция сервиса для работы с больничными листами
    private final SickLeaveService sickLeaveService;

    @Autowired
    public SickLeaveController(SickLeaveService sickLeaveService) {
        this.sickLeaveService = sickLeaveService;
    }

    // Получение списка всех больничных листов
    @GetMapping
    public List<SickLeave> getAllSickLeaves() {
        return sickLeaveService.getAllSickLeaves();
    }

    // Получение информации о больничном листе по ID
    @GetMapping("/{id}")
    public SickLeave getSickLeaveById(@PathVariable("id") Long id) {
        return sickLeaveService.getSickLeaveById(Math.toIntExact(id));
    }

    // Создание нового больничного листа
    @PostMapping
    public SickLeave createSickLeave(@RequestBody SickLeave sickLeave) {
        return sickLeaveService.createSickLeave(sickLeave);
    }

    // Обновление данных существующего больничного листа
    @PutMapping("/{id}")
    public SickLeave updateSickLeave(@PathVariable("id") Long id, @RequestBody SickLeave sickLeave) {
        return sickLeaveService.updateSickLeave(id, sickLeave);
    }

    // Удаление больничного листа по ID
    @DeleteMapping("/{id}")
    public void deleteSickLeave(@PathVariable("id") Long id) {
        sickLeaveService.deleteSickLeave(Math.toIntExact(id));
    }
}