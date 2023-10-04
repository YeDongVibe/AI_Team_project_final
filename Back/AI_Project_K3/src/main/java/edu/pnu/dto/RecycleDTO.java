package edu.pnu.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

import edu.pnu.domain.RecycleStaticsProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//직렬화 때문에 기본 생성자 추가 함 : 직렬화가 무엇?인지
@Setter
@Builder
@Getter
@AllArgsConstructor
public class RecycleDTO {

	private final Long detect_log_id;
	private final Integer rm;
	private final Integer ce;
	private final LocalTime time;
	private final LocalDate date;
	private final String category;
	private final Integer count;
	private String state;

	// public RecycleDTO(Integer rm, Integer ce, LocalDate date, LocalTime time,
	// String category, Integer count) {
	//
	// this.rm = rm;
	// this.ce = ce;
	// this.date = date;
	// this.time = time;
	// this.category = category;
	// this.count = count;
	// }

	public RecycleDTO(Object[] objs) {
		detect_log_id = (Long) objs[0];
		rm = (Integer) objs[1];
		ce = (Integer) objs[2];
		time = (LocalTime) objs[4];
		date = (LocalDate) objs[3];
		category = (String) objs[5];
		count = (Integer) objs[6];
	}

}
