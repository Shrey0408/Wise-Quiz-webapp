package com.shrey.wisequiz.service;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.shrey.wisequiz.config.customexceptions.RolenameNotFoundException;
import com.shrey.wisequiz.model.AppUser;
import com.shrey.wisequiz.model.Role;

@Service
public interface UserService {
	AppUser saveAppUser(AppUser user);
	Role saveRole(Role role);
	AppUser addRoleToUser(String username, String roleName) throws UsernameNotFoundException,RolenameNotFoundException;
	List<AppUser> getUsers();
	AppUser getUserByUsername(String username);
	void deleteUserByUsername(String username);
	List<Role> getRoles();
	Role getRoleByRoleName(String rolename);
	void deleteUserByRolename(String rolename);
	AppUser updateUserByUsername(String username, AppUser user);
}
