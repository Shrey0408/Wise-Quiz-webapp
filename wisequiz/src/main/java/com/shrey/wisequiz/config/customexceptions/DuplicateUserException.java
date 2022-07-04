package com.shrey.wisequiz.config.customexceptions;

public class DuplicateUserException extends RuntimeException {
	
	public DuplicateUserException(String errorMessage) {  
	    super(errorMessage);  
	}  
}
