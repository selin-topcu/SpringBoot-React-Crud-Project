package com.selinprojects.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Locale;
import java.util.UUID;


@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents() {
        String sql = "SELECT " +
                     " student_id, " +
                     " first_name, " +
                     " last_name, " +
                     " email, " +
                     " gender " +
                     "FROM student";

        return jdbcTemplate.query(sql, mapStudentFromDb());
    }


    public int insertStudent(UUID studentId, Student student) {
        String sql = " INSERT INTO student (student_id, first_name, last_name, email, gender) " +
                " VALUES (?, ?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql, studentId, student.getFirstName(), student.getLastName(),
                student.getEmail(), student.getGender().name().toUpperCase());
        return update;
    }

    private static RowMapper<Student> mapStudentFromDb() {
        return (rs, rowNum) -> {
            String studentIdStr = rs.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);

            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String genderStr = rs.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);
            return new Student(
                    studentId, firstName, lastName, email, gender
            );

        };
    }

}
