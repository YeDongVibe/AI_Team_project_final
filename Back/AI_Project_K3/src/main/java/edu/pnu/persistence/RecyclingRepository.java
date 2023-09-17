package edu.pnu.persistence;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.pnu.domain.RecycleStaticsProjection;
import edu.pnu.domain.Recycling;
import edu.pnu.dto.RecycleDTO;

public interface RecyclingRepository extends JpaRepository<Recycling, String> {

	// query method
	// DTO 문제
	@Query("SELECT r1.detect_log_id, r1.ce, r1.date, r1.device_id, r1.rm, r1.state, r1.time, r2.id, r2.category, r2.count "
			+
			"FROM Recycling r1 " +
			"JOIN r1.recycleRes r2")
	// + " where tr.detect_log_id = rr.detect_log_id")
	List<Object[]> findRecyclingAndRecycleRes();

	@Query("select r.rm, r.ce, r.date, r.time, rr.category, rr.count"
			+ " from Recycling r "
			+ " join r.recycleRes rr"
			+ " where r.state='t' or r.state='true' and rr.category = ?1")
	List<Object[]> findRecycleStaticsByCategory(String category);

	@Query("select tr.rm, tr.ce, tr.date, tr.time, rl.category, rl.count"
			+ " from Recycling tr"
			+ " join tr.recycleRes rl"
			+ " where (tr.state='t' or tr.state='true') and tr.date between ?1 and ?2")
	List<Object[]> findRecycleStaticsByDate(LocalDate date1, LocalDate date2);

	@Query("select tr.rm, tr.ce, tr.date, tr.time, rl.category, rl.count"
			+ " from Recycling tr"
			+ " join tr.recycleRes rl "
			+ " where (tr.state='t' or tr.state='true') and tr.time between ?1 and ?2")
	List<Object[]> findRecycleStaticsByTime(LocalTime time1, LocalTime time2);
}
