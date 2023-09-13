package edu.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.UserLog;

public interface UserLogRepository extends JpaRepository<UserLog, String> {

}
