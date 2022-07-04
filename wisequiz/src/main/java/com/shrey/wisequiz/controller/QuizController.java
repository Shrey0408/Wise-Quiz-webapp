package com.shrey.wisequiz.controller;

import java.net.URI;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.shrey.wisequiz.components.AnswersForEvaluation;
import com.shrey.wisequiz.model.AppUser;
import com.shrey.wisequiz.model.Quiz;
import com.shrey.wisequiz.service.QuizService;
import com.shrey.wisequiz.service.UserService;

@RestController
@RequestMapping("api/quiz")
@CrossOrigin("*")
public class QuizController {

	private final QuizService quizService;
	
	@Autowired
	public QuizController(QuizService quizService) {
		super();
		this.quizService = quizService;
	}
	
	//Get list of all Quizes
		@GetMapping
		public ResponseEntity<List<Quiz>> getQuizes(){
			return ResponseEntity.ok(quizService.getQuizes());
		}
		
		//Get single quiz
		@GetMapping("/{quizid}")
		public ResponseEntity<Quiz> getQuiz(@PathVariable Long quizid){
			return ResponseEntity.ok(quizService.getQuiz(quizid));
		}
		
		//Delete a Quiz
		@DeleteMapping("/{quizid}")
		public ResponseEntity<?> deleteQuiz(@PathVariable Long quizid){
			quizService.deleteById(quizid);
			return ResponseEntity.ok().build();
		}
		
		@PostMapping
		public ResponseEntity<Quiz> saveQuiz(@RequestBody Quiz quiz){
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/quiz").toUriString());
			return ResponseEntity.created(uri).body(quizService.saveQuiz(quiz));
		}
		
		@PostMapping("/evaluate")
		public ResponseEntity<String> getResult(@RequestBody List<AnswersForEvaluation> answers){
			return ResponseEntity.ok(quizService.getResult(answers));
		}
		
	
}
