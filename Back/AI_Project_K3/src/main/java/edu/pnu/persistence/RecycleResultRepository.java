package edu.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.RecycleRes;

public interface RecycleResultRepository extends JpaRepository<RecycleRes, String> {
}
