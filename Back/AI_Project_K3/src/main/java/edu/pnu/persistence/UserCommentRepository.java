package edu.pnu.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.pnu.domain.UserComment;
import edu.pnu.dto.UserCommentDTO;

public interface UserCommentRepository extends JpaRepository<UserComment, String> {
	
	// query method
	Optional<UserComment> findById(Integer id);
	
//	List<UserCommentDTO> findByBoardid(Integer boardId);
//	unique id는 결과가 여러개이면 반환이 안됨;
	@Query("SELECT c FROM UserComment c WHERE c.boardid.id = ?1")
	List<UserComment> findByBoardid(Integer id);
	
	Optional<UserComment> deleteById(Integer id);
	
	

}
