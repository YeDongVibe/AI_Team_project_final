package edu.pnu.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, String> {
	
	Optional<ImageEntity> findById(Long id);
	
	Optional<ImageEntity> findByName(String name);
}
