package edu.pnu.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	// query method
	Optional<UserEntity> findByUsername(String user);

}
