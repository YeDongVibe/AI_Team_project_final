package edu.pnu.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.pnu.domain.UserBoard;
import edu.pnu.domain.UserEntity;
import edu.pnu.dto.UserBoardDTO;
import edu.pnu.persistence.UserBoardRepository;
import edu.pnu.persistence.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserBoardServiceImpl implements UserBoardService {

	private final UserBoardRepository boardRepo;
	private final UserRepository userRepo;

	// Board 게시판 글
	@Override
	public void createBoard(UserBoardDTO board) {
		String username = board.getUsername();
		Optional<UserEntity> userEntity = userRepo.findByUsername(username);
		
		UserBoard newBoard = new UserBoard();
		newBoard.setTitle(board.getTitle());
		newBoard.setContent(board.getContent());
//		newBoard.setDate(en);
		newBoard.setUsername(userEntity.get());
		newBoard.setDate(LocalDate.now());
		newBoard.setTime(LocalTime.now());
		newBoard.setViewcnt(0);
		boardRepo.save(newBoard);
	}

	// list
	@Override
	public List<UserBoard> readBoardLists() {
		List<UserBoard> list = boardRepo.findAll();
//		List<UserBoardDTO> dtoList = new ArrayList<>();
//		for(UserBoard b : list) {
//			dtoList.add(UserBoardDTO.builder()
//						.id(b.getId())
//						.username(b.getUsername().getUsername())
//						.title(b.getTitle())
//						.content(b.getContent())
//						.date(b.getDate())
//						.time(b.getTime())
//						.viewcnt(b.getViewcnt()).build());
//		}
		return list;
	}

	// update
	@Override
	public void updateBoard(Integer id, UserBoardDTO board) throws Exception {
		Optional<UserBoard> optionalBoard = boardRepo.findById(id);
		if (optionalBoard.isPresent()) {
			UserBoard updateB = optionalBoard.get();
			updateB.setTitle(board.getTitle());
			updateB.setContent(board.getContent());
			updateB.setDate(LocalDate.now());
			updateB.setTime(LocalTime.now());
			
			boardRepo.save(updateB);
		}
		else {
			throw new Exception("해당 id에 해당하는 게시글을 찾을 수 없습니다.");
		}
	}

	// delete
	@Override
	public void deleteBoard(Integer id) {
		boardRepo.deleteById(id);
	}

	// search
	@Override
	public List<UserBoardDTO> searchNickname(String nickname) {
		// TODO Auto-generated method stub
		List<UserBoard> list = boardRepo.getByUsernameContaining(nickname);
		List<UserBoardDTO> newList = new ArrayList<>();
		for(UserBoard b : list) {
			newList.add(UserBoardDTO.builder()
				.id(b.getId())
				.username(b.getUsername().getUsername())
				.title(b.getTitle())
				.content(b.getContent())
				.date(b.getDate())
				.time(b.getTime())
				.viewcnt(b.getViewcnt()).build());
		}
		return newList;
	}

	@Override
	public List<UserBoard> searchTitle(String title) {
		// TODO Auto-generated method stub
		return boardRepo.findByTitleContaining(title);
	}

	@Override
	public List<UserBoard> searchTitleOrContent(String kw1, String kw2) {
		// TODO Auto-generated method stub
		return boardRepo.findByTitleContainingOrContentContaining(kw1, kw2);
	}
}
