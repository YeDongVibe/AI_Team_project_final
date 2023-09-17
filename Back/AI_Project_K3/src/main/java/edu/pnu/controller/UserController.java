package edu.pnu.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.UserEntity;
import edu.pnu.persistence.UserRepository;
import edu.pnu.provider.JwtProvider;
import edu.pnu.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public/member")
public class UserController {

	private final UserService userService;

	private final JwtProvider jwtProvider;

	private final UserRepository userRepo;

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
			String authority = findUser.get().getAuthority().toString();
			if (findUser.isPresent() && passwordEncoder.matches(password, findUser.get().getPassword())) {

				String token = jwtProvider.create(username, authority);
				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);
				return ResponseEntity.ok().headers(headers).body("login success");
			} else {
				return ResponseEntity.badRequest().body("Invalid id or password");
			}

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/test")
	public ResponseEntity<String> test() {
		try {
			UserEntity user = new UserEntity();
			user.setName("test");
			user.setEmail("test@test.co.kr");
			user.setBirth(LocalDate.now());
			user.setAuthority("ROLE_MANAGER");
			user.setUser_pw_chk(passwordEncoder.encode("1234"));
			user.setUsername("manager");
			user.setPassword(passwordEncoder.encode("1234"));

			userRepo.save(user);

			return ResponseEntity.ok().body("success");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("try again.");
		}

	}
}
