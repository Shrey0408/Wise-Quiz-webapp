package com.shrey.wisequiz.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shrey.wisequiz.model.Question;

public interface QuestionRepo extends JpaRepository<Question, Long> {

}
