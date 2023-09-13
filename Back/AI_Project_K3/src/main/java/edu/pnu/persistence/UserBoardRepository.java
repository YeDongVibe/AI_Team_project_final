package edu.pnu.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.pnu.domain.UserBoard;
import edu.pnu.dto.UserBoardDTO;

@Repository
public interface UserBoardRepository extends JpaRepository<UserBoard, String>  {
	
//	@query method
	Optional<UserBoard> findById(int id);
	
	Optional<UserBoard> deleteById(int id);
	
	@Query("SELECT b FROM UserBoard b WHERE b.username.username = ?1")
	List<UserBoard> getByUsernameContaining(String keyword);
	
	List<UserBoard> findByUsernameContaining(String keyword);
	
	List<UserBoard> findByTitleContaining(String keyword);
	
	List<UserBoard> findByTitleContainingOrContentContaining(String kw1, String kw2);

}