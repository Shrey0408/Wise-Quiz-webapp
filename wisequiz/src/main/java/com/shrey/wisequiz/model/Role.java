package com.shrey.wisequiz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String rolename;
	
	

	public Role() {
		super();
	}

	public Role(Long id, String name) {
		super();
		this.id = id;
		this.rolename = name;
	}

	public Long getId() {
		return id;
	}

	public String getRolename() {
		return rolename;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	
	
			

}
