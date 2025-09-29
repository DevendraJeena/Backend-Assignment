package com.bajarangs.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.bajarangs.backend.entity.Task;
import com.bajarangs.backend.repository.TaskRepository;
import com.bajarangs.backend.repository.UserRepository;
import com.bajarangs.backend.entity.User;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    @Autowired private TaskRepository taskRepository;
    @Autowired private UserRepository userRepository;

    @GetMapping
    public List<Task> getMyTasks(@AuthenticationPrincipal User user) {
        if (user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return taskRepository.findAll();
        }
        return taskRepository.findByUser(user);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task, @AuthenticationPrincipal User user) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updated, @AuthenticationPrincipal User user) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getId().equals(user.getId()) && !user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new RuntimeException("Forbidden");
        }
        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setCompleted(updated.isCompleted());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getId().equals(user.getId()) && !user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new RuntimeException("Forbidden");
        }
        taskRepository.delete(task);
    }
}
