// com/example/employeemanagement/service/SickLeaveServiceImpl.java

package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.SickLeaveNotFoundException;
import com.example.employeemanagement.model.SickLeave;
import com.example.employeemanagement.repository.SickLeaveRepository;
import com.example.employeemanagement.service.SickLeaveService;
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
public class SickLeaveServiceImpl implements SickLeaveService {

    @Autowired
    private SickLeaveRepository sickLeaveRepository;

    @Override
    @Transactional
    public SickLeave createSickLeave(SickLeave sickLeave) {
        // Проверки перед созданием больничного листа:
        // 1. Проверка наличия обязательных полей
        if (sickLeave.getEmployee() == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника.");
        }
        if (sickLeave.getStartDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату начала больничного.");
        }
        if (sickLeave.getEndDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату окончания больничного.");
        }

        // 2. Проверка корректности дат
        if (sickLeave.getStartDate().after(sickLeave.getEndDate())) {
            throw new IllegalArgumentException("Дата начала больничного не может быть после даты окончания.");
        }
        if (sickLeave.getStartDate().before(new Date())) {
            throw new IllegalArgumentException("Дата начала больничного не может быть в прошлом.");
        }

        // 3. Проверка на наличие уже существующего больничного листа в этом периоде
        if (sickLeaveRepository.existsByEmployeeIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                sickLeave.getEmployee().getId(), sickLeave.getEndDate(), sickLeave.getStartDate())) {
            throw new IllegalArgumentException("В этом периоде уже существует больничный лист.");
        }

        return sickLeaveRepository.save(sickLeave);
    }

    @Override
    public SickLeave getSickLeaveById(Integer id) {
        return sickLeaveRepository.findById(id).orElseThrow(() -> new SickLeaveNotFoundException(id));
    }

    @Override
    public List<SickLeave> getAllSickLeaves() {
        return sickLeaveRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteSickLeave(Integer id) {
        sickLeaveRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SickLeave updateSickLeave(Long id, SickLeave sickLeave) {
        // Проверки перед обновлением:
        // 1. Проверка существования записи
        Optional<SickLeave> existingSickLeave = sickLeaveRepository.findById(sickLeave.getId());
        if (existingSickLeave.isEmpty()) {
            throw new SickLeaveNotFoundException(sickLeave.getId());
        }

        if (sickLeave.getEmployee() == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника.");
        }
        if (sickLeave.getStartDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату начала больничного.");
        }
        if (sickLeave.getEndDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату окончания больничного.");
        }

        // 2. Проверка корректности дат
        if (sickLeave.getStartDate().after(sickLeave.getEndDate())) {
            throw new IllegalArgumentException("Дата начала больничного не может быть после даты окончания.");
        }
        if (sickLeave.getStartDate().before(new Date())) {
            throw new IllegalArgumentException("Дата начала больничного не может быть в прошлом.");
        }

        // 3. Проверка на наличие уже существующего больничного листа в этом периоде
        if (sickLeaveRepository.existsByEmployeeIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                sickLeave.getEmployee().getId(), sickLeave.getEndDate(), sickLeave.getStartDate())) {
            throw new IllegalArgumentException("В этом периоде уже существует больничный лист.");
        }

        return sickLeaveRepository.save(sickLeave);
    }

    @Override
    public Page<SickLeave> getAllSickLeaves(Pageable pageable) {
        return sickLeaveRepository.findAll(pageable);
    }
}