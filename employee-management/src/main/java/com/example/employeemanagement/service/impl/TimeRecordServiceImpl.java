//  com/example/employeemanagement/service/TimeRecordServiceImpl.java

package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.TimeRecordNotFoundException;
import com.example.employeemanagement.model.TimeRecord;
import com.example.employeemanagement.repository.TimeRecordRepository;
import com.example.employeemanagement.service.TimeRecordService;
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
public class TimeRecordServiceImpl implements TimeRecordService {

    @Autowired
    private TimeRecordRepository timeRecordRepository;

    @Override
    @Transactional
    public TimeRecord createTimeRecord(TimeRecord timeRecord) {
        //  Проверки  перед  созданием  записи  о  рабочем  времени:
        //  1.  Проверка  наличия  обязательных  полей
        if (timeRecord.getEmployee() == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника.");
        }
        if (timeRecord.getDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату.");
        }
        if (timeRecord.getStartTime() == null) {
            throw new IllegalArgumentException("Необходимо указать время начала.");
        }
        if (timeRecord.getEndTime() == null) {
            throw new IllegalArgumentException("Необходимо указать время окончания.");
        }

        //  2.  Проверка  формата  времени  (реализуйте  проверку  по  вашему  требованию)

        //  3.  Проверка,  что  время  начала  меньше  времени  окончания
        if (timeRecord.getStartTime().after(timeRecord.getEndTime())) {
            throw new IllegalArgumentException("Время начала не может быть позже времени окончания.");
        }

        return timeRecordRepository.save(timeRecord);
    }

    @Override
    public TimeRecord getTimeRecordById(Integer id) {
        return timeRecordRepository.findById(id).orElseThrow(() -> new TimeRecordNotFoundException(id));
    }

    @Override
    public List<TimeRecord> getAllTimeRecords() {
        return timeRecordRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteTimeRecord(Integer id) {
        timeRecordRepository.deleteById(id);
    }

    @Override
    @Transactional
    public TimeRecord updateTimeRecord(TimeRecord timeRecord) {
        //  Проверки  перед  обновлением:
        //  1.  Проверка  существования  записи
        Optional<TimeRecord> existingTimeRecord = timeRecordRepository.findById(timeRecord.getId());
        if (existingTimeRecord.isEmpty()) {
            throw new TimeRecordNotFoundException(timeRecord.getId());
        }

        //  2.  Проверки  на  наличие  обязательных  полей,  формата  времени  и  т.д.  
        //  ... (Аналогичные  проверкам  в  createTimeRecord)

        return timeRecordRepository.save(timeRecord);
    }

    @Override
    public Page<TimeRecord> getAllTimeRecords(Pageable pageable) {
        return timeRecordRepository.findAll(pageable);
    }
}