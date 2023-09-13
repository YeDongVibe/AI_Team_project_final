package edu.pnu.domain;

import java.time.LocalTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "comment")
public class UserComment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "username", referencedColumnName = "username")
	private UserEntity username;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id", referencedColumnName = "id")
	private UserBoard boardid;
	
	private String content;
	@Column(columnDefinition = "DATE")
	private Date date;
	@Column(columnDefinition = "TIME")
	private LocalTime time;
}
