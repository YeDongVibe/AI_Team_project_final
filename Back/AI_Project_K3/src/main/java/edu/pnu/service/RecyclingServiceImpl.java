package edu.pnu.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.pnu.domain.Recycling;
import edu.pnu.dto.RecycleDTO;
import edu.pnu.persistence.RecycleResultRepository;
import edu.pnu.persistence.RecyclingRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RecyclingServiceImpl implements RecyclingService {

	private final RecyclingRepository recycleRepo;
	private final RecycleResultRepository recycleResRepo;

	@Override
	public List<Recycling> getAllRecyclings() {
		return recycleRepo.findRecyclingAll();
	}

	@Override
	public List<RecycleDTO> getRecycleType(String type) {
//		List<RecycleStaticsProjection> projections = recycleRepo.findRecycleStatisticsByCategory(type);
//		return projections.stream().map(RecycleDTO::from).collect(Collectors.toList());
		List<Object[]> list = recycleRepo.findRecycleStaticsByCategory(type);

		List<RecycleDTO> ret = new ArrayList<>();
		// tr.rm, tr.ce, tr.date, tr.time, rl.category, rl.count
		for (Object[] objs : list) {
			ret.add(new RecycleDTO(objs));
		}
		return ret;
	}

	@Override
	public List<RecycleDTO> getEachTime(LocalTime time1, LocalTime time2) {
		List<Object[]> list = recycleRepo.findRecycleStaticsByTime(time1, time2);

		List<RecycleDTO> ret = new ArrayList<>();
		// tr.rm, tr.ce, tr.date, tr.time, rl.category, rl.count
		for (Object[] objs : list) {
			ret.add(new RecycleDTO(objs));
		}
		return ret;
	}

	@Override
	public List<RecycleDTO> getEachDay(LocalDate day1, LocalDate day2) {
		List<Object[]> list = recycleRepo.findRecycleStaticsByDate(day1, day2);

		List<RecycleDTO> ret = new ArrayList<>();
		// tr.rm, tr.ce, tr.date, tr.time, rl.category, rl.count
		for (Object[] objs : list) {
			ret.add(new RecycleDTO(objs));
		}
		return ret;

	}
}
