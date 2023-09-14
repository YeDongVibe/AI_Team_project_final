package edu.pnu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

@Configuration
public class JacksonConfig {

	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		Hibernate5Module hibernateModule = new Hibernate5Module();
		hibernateModule.configure(Hibernate5Module.Feature.FORCE_LAZY_LOADING, true);
		objectMapper.registerModule(hibernateModule);
		return objectMapper;
	}
}
