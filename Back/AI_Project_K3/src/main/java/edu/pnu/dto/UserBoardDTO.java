package edu.pnu.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserBoardDTO {

	private Integer id;
	private String username;
	private String title;
	private String content;
	private LocalDate date;
	private LocalTime time;
	private Integer viewcnt;

}