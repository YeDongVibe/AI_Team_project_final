package edu.pnu.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.dto.RecycleDTO;
import edu.pnu.service.RecyclingService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/statistics")
public class RecycleController {

	private final RecyclingService recycleService;

//	// 모든 리스트 가져오기
//	@GetMapping("/readAllRecycle")
//	public List<Recycling> readDB() {
//		return recycleService.getAllRecyclings();
//	}

	// 분리수거 종류별 통계
	@GetMapping("types/{type}")
	public List<RecycleDTO> recyclingType(@PathVariable String type) {
		return recycleService.getRecycleType(type);
	}

	// 시간별 통계
	@GetMapping("times/{time}/{time2}")
	public List<RecycleDTO> readEachTime(@PathVariable @DateTimeFormat(pattern = "HH:mm:ss") LocalTime time,
			@PathVariable @DateTimeFormat(pattern = "HH:mm:ss")LocalTime time2) {
		return recycleService.getEachTime(time, time2);
	}

	// 일자별 통계
	@GetMapping("days/{day}/{day2}")
	public List<RecycleDTO> readEachDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate day,
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate day2) {
		return recycleService.getEachDay(day,day2);
	}

}
