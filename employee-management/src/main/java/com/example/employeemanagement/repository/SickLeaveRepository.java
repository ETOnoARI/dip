
package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.SickLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface SickLeaveRepository extends JpaRepository<SickLeave, Integer> {
    boolean existsByEmployeeIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(Integer employeeId, Date endDate, Date startDate);
}