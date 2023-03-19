package com.selinprojects.demo;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatorTest {
    private final EmailValidator underTest = new EmailValidator();
    @Test
    public void itShouldValideteCorrectEmail() {
        assertThat(underTest.test("hi@gmail.com")).isTrue();
    }
    @Test
    public void itShouldValideteIncorrectEmail() {
        assertThat(underTest.test("higmailcom")).isFalse();
    }
    @Test
    public void itShouldValideteAnIncorrectEmailWithoutDotAtTheEnd() {
        assertThat(underTest.test("hi@gmail")).isFalse();
    }
}