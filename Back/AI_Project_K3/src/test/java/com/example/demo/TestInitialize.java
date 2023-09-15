package com.example.demo;

import java.time.LocalDate;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.pnu.domain.UserEntity;
import edu.pnu.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

// package com.example.demo;

// import java.io.BufferedReader;
// import java.io.InputStreamReader;
// import java.util.ArrayList;
// import java.util.List;

// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.web.multipart.MultipartFile;

// import edu.pnu.domain.Recycling;

 @SpringBootTest
 @RequiredArgsConstructor
 public class TestInitialize {
	 
	 private final UserRepository userRepo;
	 private final PasswordEncoder passwordEncoder;
	 
	 @Test
	 public void insertManager() {
		 UserEntity user = new UserEntity();
		 user.setUsername("test");
		 user.setPassword(passwordEncoder.encode("1234"));
		 user.setUser_pw_chk(passwordEncoder.encode("1234"));
		 user.setName("test");
		 user.setEmail("test@test.co.kr");
		 user.setBirth(LocalDate.now());
		 user.setAuthority("ROLE_MANAGER");
		 
		 userRepo.save(user);
		 
	 }

 }
