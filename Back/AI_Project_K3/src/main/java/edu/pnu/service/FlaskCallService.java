package edu.pnu.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
//@RequiredArgsConstructor
public class FlaskCallService {
	
	public String sendImageToFlask(String imgURL) {
		
		String flaskURL = "http://127.0.0.1:5000/process_image";
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		
		// flask 서버로 전송할 데이터 설정
		Map<String, String> requestBody = new HashMap<>();
		requestBody.put("image_url", imgURL);
		
		// 왜 여기서 자꾸 예외처리 나는지 모르겠네 왜진
		HttpEntity<Map<String,String>> requestEntity = new HttpEntity<>(requestBody, headers);
		ResponseEntity<String> response = restTemplate.exchange(
				flaskURL,
				HttpMethod.POST,
				requestEntity,
				String.class
				);
		
		return response.getBody();
	}
}
