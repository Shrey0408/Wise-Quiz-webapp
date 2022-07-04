package com.shrey.wisequiz.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.management.relation.RoleNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shrey.wisequiz.config.customexceptions.DuplicateRoleException;
import com.shrey.wisequiz.config.customexceptions.DuplicateUserException;
import com.shrey.wisequiz.config.customexceptions.RolenameNotFoundException;
import com.shrey.wisequiz.config.customexceptions.UsernameNotFoundException;
import com.shrey.wisequiz.model.AppUser;
import com.shrey.wisequiz.model.Role;
import com.shrey.wisequiz.repo.RoleRepo;
import com.shrey.wisequiz.repo.UserRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

	private final UserRepo userRepo;
	private final RoleRepo roleRepo;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public UserServiceImpl(UserRepo userRepo, RoleRepo roleRepo, PasswordEncoder passwordEncoder) {
		super();
		this.userRepo = userRepo;
		this.roleRepo = roleRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public AppUser saveAppUser(AppUser user) throws DuplicateUserException {

		if (userRepo.findByUsername(user.getUsername()) != null) {
			throw new DuplicateUserException("NotUnique - username already present in system");
		}
		log.info("Saving User {} in DB", user);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role role = roleRepo.findByRolename("ROLE_USER");
		user.getRoles().add(role);
		userRepo.save(user);
		return userRepo.findByUsername(user.getUsername());
	}

	@Override
	public Role saveRole(Role role) {
		if (roleRepo.findByRolename(role.getRolename()) != null) {
			throw new DuplicateRoleException("NotUnique - Rolename already present in system");
		}
		log.info("Saving Role {} in DB", role);
		return roleRepo.save(role);
	}

	@Override
	public AppUser addRoleToUser(String username, String rolename){
		
		AppUser user; 
		try {
			 user = userRepo.findByUsername(username);

			if (user.getRoles().contains(roleRepo.findByRolename(rolename))) {
				log.info("User Already has this role");
				throw new DuplicateRoleException("User already has this role");
			}
		} catch (NullPointerException e) {
			log.info("User not found");
			throw new com.shrey.wisequiz.config.customexceptions.UsernameNotFoundException("User not found");
		}
			Role role = roleRepo.findByRolename(rolename);
			user.getRoles().add(role);
			log.info("Adding Role {} to {}", rolename, username);
		
		return user;
		
	}

	@Override
	public List<AppUser> getUsers() {
		log.info("Getting all user from DB");
		return userRepo.findAll();
	}

	@Override
	public AppUser getUserByUsername(String username) {
		log.info("Getting user {} from DB", username);
		return userRepo.findByUsername(username);
	}

	@Override
	public void deleteUserByUsername(String username) {
		log.info("Deleting user {} from DB", username);
		userRepo.deleteById(userRepo.findByUsername(username).getId());
	}

	@Override
	public List<Role> getRoles() {
		log.info("Getting all roles from DB");
		return roleRepo.findAll();
	}

	@Override
	public Role getRoleByRoleName(String rolename) {
		log.info("Getting role {} from DB", rolename);
		return roleRepo.findByRolename(rolename);
	}

	@Override
	public void deleteUserByRolename(String rolename) {
		log.info("Deleting Role {} from DB", rolename);
		roleRepo.deleteById(roleRepo.findByRolename(rolename).getId());
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser user = userRepo.findByUsername(username);
		if (user == null) {
			log.info("User not found in DB");
			throw new UsernameNotFoundException("User not found Exception in DB");
		} else {
			log.info("User {} found  in DB", username);

		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRolename())));

		return new User(user.getUsername(), user.getPassword(), authorities);
	}

	@Override
	public AppUser updateUserByUsername(String username, AppUser user) {
		AppUser existingUser= getUserByUsername(username);
		user.setId(existingUser.getId());
		user.setPassword(existingUser.getPassword());
		user.setUsername(username);
		userRepo.save(user);
		return userRepo.findByUsername(user.getUsername());
	}

	
}
