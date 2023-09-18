package edu.pnu.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AllRecycleDTO {

	private final Long detect_log_id;
	private final Long device_id;
	private final Long id;
	private final Integer rm;
	private final Integer ce;
	private final LocalTime time;
	private final LocalDate date;
	private final String category;
	private final Integer count;
	private final String state;

	public AllRecycleDTO(Object[] objs) {
		detect_log_id = (Long) objs[0];
		ce = (Integer) objs[1];
		date = (LocalDate) objs[2];
		device_id = (Long) objs[3];
		rm = (Integer) objs[4];
		state = (String) objs[5];
		time = (LocalTime) objs[6];
		id = (Long) objs[7];
		category = (String) objs[8];
		count = (Integer) objs[9];
	}

}
