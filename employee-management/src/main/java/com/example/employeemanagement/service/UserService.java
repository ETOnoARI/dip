//  com/example/employeemanagement/service/UserService.java

package com.example.employeemanagement.service;

import com.example.employeemanagement.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    User getUserById(Integer id);
    List<User> getAllUsers();
    void deleteUser(Integer id);
    User updateUser(User user);
    Page<User> getAllUsers(Pageable pageable);
    User getUserByEmail(String email);
}