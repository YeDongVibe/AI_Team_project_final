package edu.pnu.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.UserEntity;
import edu.pnu.provider.JwtProvider;
import edu.pnu.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class UserController {

	private final UserService userService;
	
	private final JwtProvider jwtProvider;
	
	private final PasswordEncoder passwordEncoder;

	// create Member
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody UserEntity user) {
		try {
			userService.createUser(user);
			return ResponseEntity.ok("Created account");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// get x , post o
	// login
	@PostMapping("/login")
	public ResponseEntity<String> signIn(@RequestBody UserEntity user) {
		try {
			
			String username = user.getUsername();
			String password = user.getPassword();
			
			
			Optional<UserEntity> findUser = userService.getUser(user);
//			String authority = 
			if(findUser.isPresent() && passwordEncoder.matches(password,findUser.get().getPassword())) {
				
//				String token = jwtProvider.create(username, authority);
				return ResponseEntity.ok("ok");
			}else {
				return ResponseEntity.badRequest().body("Invalid id or password");
			}
			
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
