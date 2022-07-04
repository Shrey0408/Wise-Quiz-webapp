package com.shrey.wisequiz.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shrey.wisequiz.model.Role;

public interface RoleRepo extends JpaRepository<Role, Long>{

	Role findByRolename(String roleName);

}
