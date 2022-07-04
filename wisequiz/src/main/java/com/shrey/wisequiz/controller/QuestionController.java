package com.shrey.wisequiz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shrey.wisequiz.model.Question;
import com.shrey.wisequiz.service.QuizService;


@RestController
@RequestMapping("api/quiz/question")
@CrossOrigin("*")
public class QuestionController {
private final QuizService quizService;
	
	@Autowired
	public QuestionController(QuizService quizService) {
		super();
		this.quizService = quizService;
	}

	@GetMapping("all/{quizid}")
	public ResponseEntity<List<Question>> getQuestions(@PathVariable Long quizid){
		return ResponseEntity.ok(quizService.getQuestions(quizid));
	}
	
	@GetMapping("/{questionid}")
	public ResponseEntity<Question> getQuestion(@PathVariable Long questionid){
		return ResponseEntity.ok(quizService.getQuestion(questionid));
	}
	
	@PostMapping("/{quizid}")
	public ResponseEntity<Question> addQuestion(@PathVariable Long quizid, @RequestBody Question question){
		return ResponseEntity.ok(quizService.addQuestion(quizid, question));
	}
	

	@DeleteMapping("/{quizid}/{questionid}")
	public ResponseEntity<?> deleteQuestion(@PathVariable("quizid") Long quizid, @PathVariable("questionid") Long questionid){
		quizService.deleteQuestion(quizid, questionid);
		return ResponseEntity.ok().build();
	}
}
