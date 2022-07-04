package com.shrey.wisequiz.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shrey.wisequiz.components.AnswersForEvaluation;
import com.shrey.wisequiz.model.Question;
import com.shrey.wisequiz.model.Quiz;

@Service
public interface QuizService {

	List<Quiz> getQuizes();

	Quiz getQuiz(Long quizid);

	void deleteById(Long quizid);

	Quiz saveQuiz(Quiz quiz);

	String getResult(List<AnswersForEvaluation> answers);

	List<Question> getQuestions(Long quizid);

	Question addQuestion(Long quizid, Question question);

	void deleteQuestion(Long quizid, Long questionid);

	Question getQuestion(Long questionid);

}
