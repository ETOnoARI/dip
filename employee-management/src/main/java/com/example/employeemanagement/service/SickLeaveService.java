// com/example/employeemanagement/service/SickLeaveService.java

package com.example.employeemanagement.service;

import com.example.employeemanagement.model.SickLeave;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SickLeaveService {
    SickLeave createSickLeave(SickLeave sickLeave);
    SickLeave getSickLeaveById(Integer id);
    List<SickLeave> getAllSickLeaves();
    void deleteSickLeave(Integer id);
    SickLeave updateSickLeave(Long id, SickLeave sickLeave);
    Page<SickLeave> getAllSickLeaves(Pageable pageable);
}