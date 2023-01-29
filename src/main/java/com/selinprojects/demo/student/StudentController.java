package com.selinprojects.demo.student;

import com.selinprojects.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        throw new ApiRequestException("Cannot Get All Student Custom");
//       throw new IllegalStateException("Cannot Get All Student");
//        return studentService.getAllStudents();
    }

    @PostMapping
    public void addNewStudent(@RequestBody Student student) {
        student.getEmail() == null || student.getFirstName()
        studentService.addNewStudent(student);
    }



}

