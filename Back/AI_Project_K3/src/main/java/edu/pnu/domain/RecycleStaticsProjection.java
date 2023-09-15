package edu.pnu.domain;

import java.time.LocalDate;
import java.time.LocalTime;

public interface RecycleStaticsProjection {

	Long getDetect_log_id();

	Long getDevice_id();

	LocalDate getDate();

	LocalTime getTime();

	String getState();

	Integer getCe();

	Integer getRm();

	Long getId();

	String getCategory();

	Integer getCount();
}
