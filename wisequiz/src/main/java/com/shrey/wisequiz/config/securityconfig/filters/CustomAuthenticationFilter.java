package com.shrey.wisequiz.config.securityconfig.filters;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.shrey.wisequiz.config.customexceptions.UsernameNotFoundException;
import com.shrey.wisequiz.model.AppUser;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	// From SecurityConfig
	private final AuthenticationManager authenticationManager;

	public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
	}

	@Override
	// Returns user entered username and password in a token
	// exception
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		String username="";
		String password="";
//	try {
//		log.info("request => {}",request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
//	} catch (IOException e1) {
//		// TODO Auto-generated catch block
//		e1.printStackTrace();
//	}
		
		try {
			// reading JSON body from HttpServletRequest using ObjectMapper
			AppUser  usernameAndPassword = new ObjectMapper().readValue(request.getInputStream(),
					AppUser.class);
			username = usernameAndPassword.getUsername();
			password = usernameAndPassword.getPassword();
			log.info("USERNAME : {} {}", username, usernameAndPassword);
			log.info("PASSWORD : {}",password);
		} catch (Exception e) {
			log.info("Invalid Username or Password -> {}",e.getMessage());
			
		}

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);
		return authenticationManager.authenticate(authenticationToken);
	}

	@Override
	// Return JWT Token on successful login
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authentication) throws IOException, ServletException {
		User user = (User) authentication.getPrincipal();
		
		//Top Secret key used for encryting data
		Algorithm algorithm = Algorithm.HMAC256("Shrey");
		String accessToken = JWT.create().withSubject(user.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
				.withIssuer(request.getRequestURL().toString())
				.withClaim("roles",
						user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.sign(algorithm);
		
		HashMap<String,String> tokens = new HashMap<String, String>();
		tokens.put("accessToken", accessToken);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setStatus(HttpServletResponse.SC_OK);
		// Send the token in JSON body and enable pretty indent
		new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT).writeValue(response.getOutputStream(), tokens);
		
	}

}
