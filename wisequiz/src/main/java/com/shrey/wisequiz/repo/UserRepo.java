package com.shrey.wisequiz.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shrey.wisequiz.model.AppUser;

public interface UserRepo extends JpaRepository<AppUser, Long>{

	AppUser findByUsername(String username);

}
