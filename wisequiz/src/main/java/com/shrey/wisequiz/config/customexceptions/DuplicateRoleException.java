package com.shrey.wisequiz.config.customexceptions;

public class DuplicateRoleException extends RuntimeException {
	public DuplicateRoleException(String errorMessage) {  
	    super(errorMessage);  
	}  
}
