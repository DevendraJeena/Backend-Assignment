package com.bajarangs.backend.repository;

import com.bajarangs.backend.entity.Task;
import com.bajarangs.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
