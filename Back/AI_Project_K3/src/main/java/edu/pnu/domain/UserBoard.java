package edu.pnu.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board")
public class UserBoard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String title;
	private String content;
	private LocalDate date;
	private LocalTime time;

	private Integer viewcnt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "username", referencedColumnName = "username")
	private UserEntity username;
//
	@OneToMany(mappedBy = "boardid", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<UserComment> comments;
}
