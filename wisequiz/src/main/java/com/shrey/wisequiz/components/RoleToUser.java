package com.shrey.wisequiz.components;

import org.springframework.stereotype.Component;

@Component
public class RoleToUser {
	
	private String username;
	private String rolename;
	
	
	public RoleToUser() {
		super();
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

}
