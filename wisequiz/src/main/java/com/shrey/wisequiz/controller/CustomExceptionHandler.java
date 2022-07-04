package com.shrey.wisequiz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.shrey.wisequiz.config.customexceptions.DuplicateRoleException;
import com.shrey.wisequiz.config.customexceptions.DuplicateUserException;
import com.shrey.wisequiz.config.customexceptions.RolenameNotFoundException;
import com.shrey.wisequiz.config.customexceptions.UsernameNotFoundException;


@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<?> usernameNotFoundException(UsernameNotFoundException ex) {

		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DuplicateRoleException.class)
	public ResponseEntity<?> duplicateRoleException(DuplicateRoleException ex) {

		return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(RolenameNotFoundException.class)
	public ResponseEntity<?> rolenameNotFoundException(RolenameNotFoundException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DuplicateUserException.class)
	public ResponseEntity<?> duplicateUoleException(DuplicateUserException ex) {

		return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	}

}
