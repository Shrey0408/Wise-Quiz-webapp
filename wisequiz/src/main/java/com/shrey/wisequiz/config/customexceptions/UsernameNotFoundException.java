package com.shrey.wisequiz.config.customexceptions;

public class UsernameNotFoundException extends RuntimeException {

	public UsernameNotFoundException(String message) {
		super(message);
	}
	
}
