package com.shrey.wisequiz.components;

import org.springframework.stereotype.Component;

@Component
public class AnswersForEvaluation {
	private Long questionid;
	private String answerEntered;
	
	
	public AnswersForEvaluation() {
		super();
	}
	
	public AnswersForEvaluation(Long questionid, String answerEntered) {
		super();
		this.questionid = questionid;
		this.answerEntered = answerEntered;
	}
	public Long getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Long questionid) {
		this.questionid = questionid;
	}
	public String getAnswerEntered() {
		return answerEntered;
	}
	public void setAnswerEntered(String answerEntered) {
		this.answerEntered = answerEntered;
	}
	
}
