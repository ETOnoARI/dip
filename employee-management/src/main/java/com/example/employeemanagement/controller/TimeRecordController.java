package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.TimeRecord;
import com.example.employeemanagement.service.TimeRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Контроллер для управления записями о рабочем времени в REST API.
 *
 * Этот контроллер предоставляет API-endpoints для выполнения следующих операций:
 * - Получение списка всех записей о рабочем времени
 * - Получение информации о записи о рабочем времени по ID
 * - Создание новой записи о рабочем времени
 * - Обновление данных существующей записи о рабочем времени
 * - Удаление записи о рабочем времени по ID
 */
@RestController
@RequestMapping("/timerecords")
public class TimeRecordController {

    // Инъекция сервиса для работы с записями о рабочем времени
    private final TimeRecordService timeRecordService;

    @Autowired
    public TimeRecordController(TimeRecordService timeRecordService) {
        this.timeRecordService = timeRecordService;
    }

    // Получение списка всех записей о рабочем времени
    @GetMapping
    public List<TimeRecord> getAllTimeRecords() {
        return timeRecordService.getAllTimeRecords();
    }

    // Получение информации о записи о рабочем времени по ID
    @GetMapping("/{id}")
    public TimeRecord getTimeRecordById(@PathVariable("id") Long id) {
        return timeRecordService.getTimeRecordById(Math.toIntExact(id));
    }

    // Создание новой записи о рабочем времени
    @PostMapping
    public TimeRecord createTimeRecord(@RequestBody TimeRecord timeRecord) {
        return timeRecordService.createTimeRecord(timeRecord);
    }

    // Обновление данных существующей записи о рабочем времени
    @PutMapping("/{id}")
    public TimeRecord updateTimeRecord(@PathVariable("id") Long id, @RequestBody TimeRecord timeRecord) {
        return timeRecordService.updateTimeRecord(id, timeRecord);
    }

    // Удаление записи о рабочем времени по ID
    @DeleteMapping("/{id}")
    public void deleteTimeRecord(@PathVariable("id") Long id) {
        timeRecordService.deleteTimeRecord(Math.toIntExact(id));
    }
}