package edu.pnu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.pnu.domain.UserEntity;
import edu.pnu.persistence.UserRepository;

//  userDetailService - Spring security
@Service
public class USerDetailService implements UserDetailsService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not Found!"));
		// 여기서 왜 userRepo의 getter함수가 안되는지 몰겠..
		return new User(user.getUsername(), user.getPassword(), user.getAuthority());
	}

}
