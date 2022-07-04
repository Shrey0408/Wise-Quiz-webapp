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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.shrey.wisequiz.components.RoleToUser;
import com.shrey.wisequiz.config.customexceptions.RolenameNotFoundException;
import com.shrey.wisequiz.config.customexceptions.UsernameNotFoundException;
import com.shrey.wisequiz.model.AppUser;
import com.shrey.wisequiz.model.Role;
import com.shrey.wisequiz.service.UserService;


@RestController
@RequestMapping("/api/users")

public class UserController {
	

	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	//Get list of all users
	@GetMapping
	public ResponseEntity<List<AppUser>> getUsers(){
		return ResponseEntity.ok(userService.getUsers());
	}
	
	//Get specific user
	@GetMapping("/{username}")
	public ResponseEntity<AppUser> getUser(@PathVariable String username){
		return ResponseEntity.ok(userService.getUserByUsername(username));
	}
	
	@PutMapping("/{username}")
	public ResponseEntity<AppUser> updateUser(@PathVariable String username, @RequestBody AppUser user){
		return ResponseEntity.ok(userService.updateUserByUsername(username,user));
	}
	
	//Create new user
	@PostMapping
	public ResponseEntity<AppUser> saveUser(@RequestBody AppUser user){
		System.out.println("RE");
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users").toUriString());
		return ResponseEntity.created(uri).body(userService.saveAppUser(user));
	}
	
	//Add a role to user
	@PostMapping("/addroletouser")
	public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUser roleAndUser) throws UsernameNotFoundException, RolenameNotFoundException{
		
		return ResponseEntity.ok(userService.addRoleToUser(roleAndUser.getUsername(), roleAndUser.getRolename()));
	}
	
	//Delete user
	@DeleteMapping("/{username}")
	public ResponseEntity<?> deleteUser(@PathVariable("username") String username){
		userService.deleteUserByUsername(username);
		return ResponseEntity.ok().build();
	}

	//Comment this Not reqd
	@PostMapping("/roles")
	public ResponseEntity<Role> saveRole(@RequestBody Role role){
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/roles").toUriString());
		return ResponseEntity.created(uri).body(userService.saveRole(role));
	}
	
	//
	@GetMapping("/roles")
	public ResponseEntity<List<Role>> getRoles(){
		return ResponseEntity.ok(userService.getRoles());
	}
	
	//Not reqd
	@GetMapping("/roles/{rolename}")
	public ResponseEntity<Role> getRole(@PathVariable String rolename){
		return ResponseEntity.ok(userService.getRoleByRoleName(rolename));
	}
	
	//Not reqd
	@DeleteMapping("roles/{rolename}")
	public ResponseEntity<?> deleteRole(@PathVariable String rolename){
		userService.deleteUserByRolename(rolename);
		return ResponseEntity.ok().build(); 
	}
	
}