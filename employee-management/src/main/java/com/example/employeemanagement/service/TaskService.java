// com/example/employeemanagement/service/TaskService.java

package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {
    Task createTask(Task task);
    Task getTaskById(Integer id);
    List<Task> getAllTasks();
    void deleteTask(Integer id);
    Task updateTask(Task task);
    Page<Task> getAllTasks(Pageable pageable);
}