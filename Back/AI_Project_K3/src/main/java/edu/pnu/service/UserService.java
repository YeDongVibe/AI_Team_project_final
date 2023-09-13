package edu.pnu.service;

import java.util.List;
import java.util.Optional;

import edu.pnu.domain.UserEntity;

public interface UserService {
	Optional<UserEntity> getUser(UserEntity user);
	void createUser(UserEntity user);
	List<UserEntity> getAllUsers();
	UserEntity authenticate(String id, String pw);
		
}
