package com.example.todo_caled.controller;

import com.example.todo_caled.entity.Task;
import com.example.todo_caled.service.TaskService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173") // ✅ 반드시 클래스 위에
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Optional<Task> getTask(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    // ✅ 새로 추가할 부분
    @GetMapping("/shared")
    public List<Task> getSharedTasks() {
        // 일단 전체 task 반환 (나중에 공유된 항목만 필터링 가능)
        return taskService.getAllTasks();
    }
}
