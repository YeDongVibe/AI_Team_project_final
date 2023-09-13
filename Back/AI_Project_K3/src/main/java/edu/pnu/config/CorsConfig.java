package edu.pnu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// cors 허용
@Configuration
@EnableWebMvc //Spring Web MVC 구성을 명시
public class CorsConfig implements WebMvcConfigurer{

	  @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	        		//특정 주소 하나만 선택해줘야 함
	                .allowedOrigins("http://localhost:3000", "http://localhost:5000/process_image")
	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                .allowedHeaders("*")
	                .allowCredentials(true);
	    }
}
