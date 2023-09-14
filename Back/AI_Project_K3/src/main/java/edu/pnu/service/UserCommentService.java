package edu.pnu.service;

import java.util.List;

import edu.pnu.domain.UserComment;
import edu.pnu.dto.UserCommentDTO;

public interface UserCommentService {
	
	//리뷰 작성
	public void insertComment(UserCommentDTO comment);
	
	//리뷰 리스트
	public List<UserCommentDTO> commentLists(Integer id);
	
	//리뷰 수정
	public void updateComment(Integer id, UserCommentDTO comment) throws Exception;
	
	//delete review
	void deleteComment(Integer id);
}
