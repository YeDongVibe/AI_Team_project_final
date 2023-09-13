package edu.pnu.dto;


import java.time.LocalTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserCommentDTO {

	private Integer id;
	private String username;
	private Integer boardid;
	private String content;
	private Date date;
	private LocalTime time;
	
	
}
