package edu.pnu.service;


import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.pnu.domain.UserBoard;
import edu.pnu.domain.UserComment;
import edu.pnu.domain.UserEntity;
import edu.pnu.dto.UserCommentDTO;
import edu.pnu.persistence.UserBoardRepository;
import edu.pnu.persistence.UserCommentRepository;
import edu.pnu.persistence.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserCommentServiceImpl implements UserCommentService {

	private final UserCommentRepository commentRepo;
	private final UserRepository userRepo;
	private final UserBoardRepository boardRepo;

	// table insert
	@Override
	public void insertComment(UserCommentDTO comment) {
		String username = comment.getUsername();
		Integer boardId = comment.getBoardid();
		Optional<UserBoard> userBoard = boardRepo.findById(boardId);
		Optional<UserEntity> userEntity = userRepo.findByUsername(username);
		// TODO Auto-generated method stub
		UserComment rv = new UserComment();
		rv.setContent(comment.getContent());
		rv.setDate(new Date());
		rv.setTime(LocalTime.now());
		rv.setUsername(userEntity.get());
		rv.setBoardid(userBoard.get());
		commentRepo.save(rv);
	}

	// read table(안됨) -> boardid unique 때문에 ?
	@Override
	public List<UserComment> commentLists(Integer id) {
		List<UserComment> newComment = commentRepo.findByBoardid(id);
		
		return newComment;

	}

	// update table
	@Override
	public void updateComment(Integer id, UserCommentDTO comment) throws Exception {
		// TODO Auto-generated method stub
		Optional<UserComment> listComment = commentRepo.findById(id);
		if (listComment.isPresent()) {
			UserComment c = listComment.get();
			c.setContent(comment.getContent());
			c.setDate(new Date());
			c.setTime(LocalTime.now());
			
			commentRepo.save(c);
		} else {
			throw new Exception("해당하는 board id가 없습니다.");
		}
	}

	// delete table
	@Override
	public void deleteComment(Integer id) {
		// TODO Auto-generated method stub
		commentRepo.deleteById(id);
	}

}
