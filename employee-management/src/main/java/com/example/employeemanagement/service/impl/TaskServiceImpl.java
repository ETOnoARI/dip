// com/example/employeemanagement/service/TaskServiceImpl.java

package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.exception.TaskNotFoundException;
import com.example.employeemanagement.model.Task;
import com.example.employeemanagement.repository.TaskRepository;
import com.example.employeemanagement.service.TaskService;
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
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    @Transactional
    public Task createTask(Task task) {
        // Проверки перед созданием задачи:
        // 1. Проверка наличия обязательных полей
        if (task.getTitle() == null || task.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать название задачи.");
        }
        if (task.getEmployee() == null) {
            throw new IllegalArgumentException("Необходимо указать сотрудника.");
        }
        if (task.getDeadline() == null) {
            throw new IllegalArgumentException("Необходимо указать дедлайн.");
        }
        if (task.getStatus() == null || task.getStatus().isEmpty()) {
            throw new IllegalArgumentException("Необходимо указать статус задачи.");
        }

        // 2. Проверка даты дедлайна (не в прошлом?)
        if (task.getDeadline().before(new Date())) {
            throw new IllegalArgumentException("Дедлайн не может быть в прошлом.");
        }

        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Integer id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Task updateTask(Task task) {
        // Проверки перед обновлением:
        // 1. Проверка существования задачи
        Optional<Task> existingTask = taskRepository.findById(task.getId());
        if (existingTask.isEmpty()) {
            throw new TaskNotFoundException(task.getId());
        }

        // 2. Проверка даты дедлайна (не в прошлом?)
        if (task.getDeadline().before(new Date())) {
            throw new IllegalArgumentException("Дедлайн не может быть в прошлом.");
        }

        // 3. Дополнительная проверка при изменении статуса
        if (!existingTask.get().getStatus().equals(task.getStatus()) && task.getStatus().equals("completed")) {
            // Проверяем, что задача еще не выполнена
            if (existingTask.get().getStatus().equals("completed")) {
                throw new IllegalArgumentException("Задача уже выполнена, ее статус нельзя изменить.");
            }
        }

        return taskRepository.save(task);
    }

    @Override
    public Page<Task> getAllTasks(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }
}