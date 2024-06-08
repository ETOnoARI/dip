//  com/example/employeemanagement/service/VacationServiceImpl.java

package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.VacationNotFoundException;
import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.model.Vacation;
import com.example.employeemanagement.repository.VacationRepository;
import com.example.employeemanagement.service.VacationService;
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
public class VacationServiceImpl implements VacationService {

    @Autowired
    private VacationRepository vacationRepository;

    @Override
    @Transactional
    public Vacation createVacation(Vacation vacation) {
        //  Проверки  перед  созданием  записи  об  отпуске:
        //  1.  Проверка  наличия  обязательных  полей
        if (vacation.getEmployee() == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника.");
        }
        if (vacation.getStartDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату начала отпуска.");
        }
        if (vacation.getEndDate() == null) {
            throw new IllegalArgumentException("Необходимо указать дату окончания отпуска.");
        }
        if (vacation.getType() == null || vacation.getType().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать тип отпуска.");
        }

        //  2.  Проверка  формата  даты  (не  в  прошлом?)
        if (vacation.getStartDate().before(new Date())) {
            throw new IllegalArgumentException("Дата начала отпуска не может быть в прошлом.");
        }
        if (vacation.getEndDate().before(new Date())) {
            throw new IllegalArgumentException("Дата окончания отпуска не может быть в прошлом.");
        }

        //  3.  Проверка,  что  дата  начала  раньше  даты  окончания
        if (vacation.getStartDate().after(vacation.getEndDate())) {
            throw new IllegalArgumentException("Дата начала отпуска не может быть позже даты окончания.");
        }

        //  4.  Проверка  на  пересечение  дат  отпуска  с  другими  отпусками  (реализуйте  проверку  по  вашему  требованию)

        //  5.  Проверка  на  достаточность  количества  дней  отпуска  (реализуйте  проверку  по  вашему  требованию)

        return vacationRepository.save(vacation);
    }

    @Override
    public Vacation getVacationById(Integer id) {
        return vacationRepository.findById(id).orElseThrow(() -> new VacationNotFoundException(id));
    }

    @Override
    public List<Vacation> getAllVacations() {
        return vacationRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteVacation(Integer id) {
        vacationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Vacation updateVacation(Vacation vacation) {
        //  Проверки  перед  обновлением:
        //  1.  Проверка  существования  записи
        Optional<Vacation> existingVacation = vacationRepository.findById(vacation.getId());
        if (existingVacation.isEmpty()) {
            throw new VacationNotFoundException(vacation.getId());
        }

        if (vacation.getStartDate().before(new Date())) {
            throw new IllegalArgumentException("Дата начала отпуска не может быть в прошлом.");
        }
        if (vacation.getEndDate().before(new Date())) {
            throw new IllegalArgumentException("Дата окончания отпуска не может быть в прошлом.");
        }

        return vacationRepository.save(vacation);
    }

    @Override
    public Page<Vacation> getAllVacations(Pageable pageable) {
        return vacationRepository.findAll(pageable);
    }
}