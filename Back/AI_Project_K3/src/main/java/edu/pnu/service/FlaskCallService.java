package edu.pnu.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


// @Slf4j
@Service
// @RequiredArgsConstructor
public class FlaskCallService {

	public String sendImageToFlask(MultipartFile imgFile) {

		// flask url
		String flaskURL = "http://127.0.0.1:5000/process_image";

		// get img name
		String imgName = imgFile.getOriginalFilename();

		// local file directory
		String localImg = "C://AI_Result_img/" + imgName;

		// generate http post
		RestTemplate restTemplate = new RestTemplate();

		// Multivalue Map
		MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();

		// local file -> file resource
		File localFile = new File(localImg);

		map.add("img", new FileSystemResource(localFile));

		// setting HTTP headers
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);

		// flask 서버로 전송할 데이터 설정
		// Map<String, String> requestBody = new HashMap<>();
		// requestBody.put("image_url", imgURL);

		// 왜 여기서 자꾸 예외처리 나는지 모르겠네 왜진
		HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
		ResponseEntity<String> response = restTemplate.exchange(
				flaskURL,
				HttpMethod.POST,
				requestEntity,
				String.class);

		return response.getBody();
	}

	// image folder 업로드

	public String sendImagesToFlask(List<MultipartFile> imageFiles) throws IOException {
		// Flask 서버 URL
		String flaskURL = "http://127.0.0.1:5000/process_imageFolder";

		// Create a RestTemplate
		RestTemplate restTemplate = new RestTemplate();

		// Create a MultiValueMap to hold the files
		MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();

		// Add each image file to the map
		for (MultipartFile imageFile : imageFiles) {

			// get img name
			String imgName = imageFile.getOriginalFilename();

			// local file directory
			String localImg = "C://AI_Result_img/" + imgName;

			File localFile = new File(localImg);
			map.add("img", new FileSystemResource(localFile));

		}

		// Set HTTP headers
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);

		// Create an HTTP entity with the map and headers
		HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);

		try {
			// Send a POST request to the Flask server
			ResponseEntity<String> response = restTemplate.exchange(
					flaskURL,
					HttpMethod.POST,
					requestEntity,
					String.class);

			return response.getBody();
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
	}
}
