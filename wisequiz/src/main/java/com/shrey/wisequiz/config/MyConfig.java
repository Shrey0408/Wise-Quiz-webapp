package com.shrey.wisequiz.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.shrey.wisequiz.model.Role;
import com.shrey.wisequiz.repo.RoleRepo;

@Configuration
public class MyConfig {
	
	@Autowired
	private RoleRepo rolerepo;
	
	public CommandLineRunner commandLineRunner() {
		return (args) ->{
			if(rolerepo.findByRolename("ROLE_USER") == null) {
				rolerepo.save(new Role(null, "ROLE_USER"));
			}
			if(rolerepo.findByRolename("ROLE_ADMIN") == null) {
				rolerepo.save(new Role(null, "ROLE_ADMIN"));
			}
		};
	}

	//Default passwordEncoder 
		@Bean
		public PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}
		
//		@Bean
//		public WebMvcConfigurer corsConfigurer() {
//			return new WebMvcConfigurer() {
//				@Override
//				public void addCorsMappings(CorsRegistry registry) {
//					registry.addMapping("/**").allowedOrigins("*");
//					registry.addMapping("/**").allowedMethods("*");
//					registry.addMapping("/**").allowedOriginPatterns("*");
//					registry.addMapping("/**").allowedMethods("*");
//
//				}
//			};
//		}
	
	
}
