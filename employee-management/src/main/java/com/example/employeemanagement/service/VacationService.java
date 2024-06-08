
package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Vacation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VacationService {
    Vacation createVacation(Vacation vacation);
    Vacation getVacationById(Integer id);
    List<Vacation> getAllVacations();
    void deleteVacation(Integer id);
    Vacation updateVacation(Vacation vacation);
    Page<Vacation> getAllVacations(Pageable pageable);
}