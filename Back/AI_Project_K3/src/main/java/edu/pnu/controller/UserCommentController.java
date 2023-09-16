package edu.pnu.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.UserComment;
import edu.pnu.dto.UserCommentDTO;
import edu.pnu.service.UserCommentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserCommentController {

	private final UserCommentService commentService;

	@PostMapping("/manager/comments/insertComment")
	private ResponseEntity<String> insertRV(@RequestBody UserCommentDTO comment) {
		commentService.insertComment(comment);
		return ResponseEntity.ok("upload Success.");
	}

	@GetMapping("public/comments/readComment/{id}")
	private List<UserCommentDTO> readRV(@PathVariable Integer id) {
		return commentService.commentLists(id);
	}

	@PutMapping("/manager/comments/updateComment/{id}")
	private String updateRV(@PathVariable Integer id, @RequestBody UserCommentDTO comment) {
		try {
			commentService.updateComment(id, comment);
			return "Upload Success!";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "error occured : " + e.getMessage();
		}
	}

	// 실행 안됨 ! 뿌이뿌이뿌
	@DeleteMapping("/manager/comments/deleteComment/{id}")
	private ResponseEntity<String> deleteRV(@PathVariable Integer id) {
		commentService.deleteComment(id);
		return ResponseEntity.ok("Delete Success");
	}
}
