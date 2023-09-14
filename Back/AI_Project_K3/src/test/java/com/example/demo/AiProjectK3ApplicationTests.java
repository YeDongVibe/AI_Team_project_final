package com.example.demo;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.pnu.domain.UserEntity;
import edu.pnu.persistence.UserRepository;

@SpringBootTest
class AiProjectK3ApplicationTests {

		@Autowired
    private UserRepository userRepo;
		@Autowired
    private PasswordEncoder passwordEncoder;
    

	@Test
	public void test() {
	

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
