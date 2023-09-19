package edu.pnu.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.pnu.domain.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, String> {

	@Query("select r.id, r.caption, r.name from ImageEntity r order by r.id asc")
	List<Object[]> findAllImageEntities();
	

	Optional<ImageEntity> findById(Long id);

	Optional<ImageEntity> findByName(String name);
}
