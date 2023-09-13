package edu.pnu.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
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
@AllArgsConstructor
@NoArgsConstructor
// table이름과 class 이름이 달라서 테이블 이름 정해줘야 함
@Table(name = "total_recycle")
public class Recycling {
	@Id
	// Auto - Increment
	// @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long detect_log_id;
	private Long device_id;
	private LocalDate date;
	@Column(columnDefinition = "time")
	private LocalTime time;
	private String state;
	private Integer ce;
	private Integer rm;
	private String reason;
	

	@OneToMany(mappedBy = "detect_log_id", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<RecycleRes> recycleRes;
	
	@OneToMany(mappedBy = "logid", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<ImageEntity> imgLogId;

}
