package edu.pnu.service;

import java.util.List;

import edu.pnu.domain.UserBoard;
import edu.pnu.dto.UserBoardDTO;

public interface UserBoardService {
	// 글 작성	
	public void createBoard(UserBoardDTO board);
	// 목록
	public List<UserBoard> readBoardLists();
	// 글 수정
	public void updateBoard(Integer id, UserBoardDTO board) throws Exception;
	// 글 검색(닉네임, 내용 + 제목, 제목 검색)
	public List<UserBoardDTO> searchNickname(String nickname);
	
	public List<UserBoard> searchTitle(String title);
	
	public List<UserBoard> searchTitleOrContent(String kw1, String kw2);
	// 글 삭제
	void deleteBoard(Integer id);
	
}
