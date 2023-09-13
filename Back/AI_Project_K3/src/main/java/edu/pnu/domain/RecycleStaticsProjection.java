package edu.pnu.domain;

import java.time.LocalDate;
import java.time.LocalTime;

public interface RecycleStaticsProjection {
	
	Integer getRm();

	Integer getCe();

	LocalDate getDate();

	LocalTime getTime();

	String getCategory();

	Integer getCount();
}
