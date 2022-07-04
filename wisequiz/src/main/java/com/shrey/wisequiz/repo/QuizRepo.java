package com.shrey.wisequiz.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shrey.wisequiz.model.Quiz;

public interface QuizRepo extends JpaRepository<Quiz, Long> {

}
