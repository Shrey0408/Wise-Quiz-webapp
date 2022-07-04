package com.shrey.wisequiz.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shrey.wisequiz.components.AnswersForEvaluation;
import com.shrey.wisequiz.model.Question;
import com.shrey.wisequiz.model.Quiz;
import com.shrey.wisequiz.repo.QuestionRepo;
import com.shrey.wisequiz.repo.QuizRepo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class QuizServiceImpl implements QuizService {
	
	private final QuizRepo quizRepo;
	private final QuestionRepo questionRepo;
	
	@Autowired
	public QuizServiceImpl(QuizRepo quizRepo, QuestionRepo questionRepo) {
		super();
		this.quizRepo = quizRepo;
		this.questionRepo = questionRepo;
	}

	@Override
	public List<Quiz> getQuizes() {
		log.info("Getting list of all Quiz");
		return quizRepo.findAll();
	}

	@Override
	public Quiz getQuiz(Long quizid) {
		log.info("Getting Quiz {} ",quizid);
		return quizRepo.findById(quizid).get();
	}

	@Override
	public void deleteById(Long quizid) {
		log.info("Deleting Quiz {}", quizid);
		quizRepo.deleteById(quizid);
	}

	@Override
	public Quiz saveQuiz(Quiz quiz) {
		log.info("Saving new Quiz");
		return quizRepo.save(quiz);
	}

	@Override
	public List<Question> getQuestions(Long quizid) {
		log.info("Getting all the question of quiz id {}",quizid);
		return quizRepo.findById(quizid).get().getQuestions();
	}
	
	@Override
	public Question getQuestion(Long questionid) {
		log.info("get Question {}", questionid);
		return questionRepo.findById(questionid).get();
	}

	@Override
	public Question addQuestion(Long quizid, Question question) {
		Question q = questionRepo.save(question);
		quizRepo.findById(quizid).get().addQuestion(q);
		return q;
	}

	@Override
	public void deleteQuestion(Long quizid, Long questionid) {
		//Remove the question from quiz and then delete the question
		List<Question> questions = getQuestions(quizid);
		Question q = questions.stream().filter(question -> question.getId() == questionid).findAny().orElse(null);
		questions.remove(q);
		questionRepo.deleteById(questionid);
		
	}

	@Override
	public String getResult(List<AnswersForEvaluation> answers) {
		int count = 0;
		for(AnswersForEvaluation obj : answers) {
			log.info(obj.getQuestionid()+"  "+obj.getAnswerEntered());
			Question q =  getQuestion(obj.getQuestionid());
			log.info("Correct answer is "+ q.getAnswer());
			if(q.getAnswer().equals(obj.getAnswerEntered())) {
				
				count++;
			}
		}
		log.info("Count"+count);
		return ""+count;
	}

	
	
	
	
}
