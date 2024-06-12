
package com.example.employeemanagement.service;

import com.example.employeemanagement.model.TimeRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TimeRecordService {
    TimeRecord createTimeRecord(TimeRecord timeRecord);
    TimeRecord getTimeRecordById(Integer id);
    List<TimeRecord> getAllTimeRecords();
    void deleteTimeRecord(Integer id);
    TimeRecord updateTimeRecord(Long id, TimeRecord timeRecord);
    Page<TimeRecord> getAllTimeRecords(Pageable pageable);
}