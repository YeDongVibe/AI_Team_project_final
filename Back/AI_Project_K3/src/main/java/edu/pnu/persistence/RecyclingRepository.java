package edu.pnu.persistence;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.pnu.domain.Recycling;

public interface RecyclingRepository extends JpaRepository<Recycling, String> {

	// query method
	// DTO 문제 
//	 @Query("select * " 
//	 	+ " from Recycling tr"
//	 	+ " join tr.RecycleRes rl")
//	 List<Object[]> findRecyclingAll();

	@Query("select r.rm, r.ce, r.date, r.time, rr.category, rr.count"
			+ " from Recycling r "
			+ " join r.recycleRes rr"
			+ " where r.state='t' and rr.category = ?1")
	List<Object[]> findRecycleStaticsByCategory(String category);
	
	@Query("select tr.rm, tr.ce, tr.date, tr.time, rl.category, rl.count"
			+ " from Recycling tr"
			+ " join tr.recycleRes rl"
			+ " where tr.state='t' and tr.date between ?1 and ?2")
	List<Object[]> findRecycleStaticsByDate(LocalDate date1, LocalDate date2);
	
	@Query("select tr.rm, tr.ce, tr.date, tr.time, rl.category, rl.count" 
			+ " from Recycling tr"
			+ " join tr.recycleRes rl " 
			+ " where tr.state='t' and tr.time between ?1 and ?2")
	List<Object[]> findRecycleStaticsByTime(LocalTime time1, LocalTime time2);
}
