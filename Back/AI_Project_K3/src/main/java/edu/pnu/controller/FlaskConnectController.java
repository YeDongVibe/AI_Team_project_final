package edu.pnu.controller;

import java.util.Map;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.ImageEntity;
import edu.pnu.persistence.ImageRepository;
import edu.pnu.service.FlaskCallService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public/prediction")
public class FlaskConnectController {
	
	private final FlaskCallService flaskService;
	
	private final ImageRepository imgRepo;
	
	@PostMapping("/put_image")
	public ResponseEntity<String> processImage(@RequestBody Map<String, String> requestBody) {
	    String imageUrl = requestBody.get("image_url");

	    // Flask 서버에 이미지 URL 전송
	    String flaskResponse = flaskService.sendImageToFlask(imageUrl);

	    // Flask 서버에서 받은 응답을 JSON으로 파싱
	    // 예시: {"caption": "Generated caption for the image"}
	    JSONObject jsonResponse = new JSONObject(flaskResponse);
	    String caption = jsonResponse.getString("caption");

	    // 이미지 캡션을 저장
	    Optional<ImageEntity> imgOptional = imgRepo.findByName(imageUrl);
	    if (imgOptional.isPresent()) {
	        ImageEntity imgEntity = imgOptional.get();
	        imgEntity.setCaption(caption);
	        imgRepo.save(imgEntity);
	    }

	    return ResponseEntity.ok(caption);
	}
	
	@GetMapping("/caption")
	public ResponseEntity<String> receiveCaption(@RequestBody Map<String,String> json){
		String caption = json.get("caption");
		ImageEntity imgEntity = new ImageEntity();
		imgEntity.setCaption(caption);
		imgRepo.save(imgEntity);
		
		return ResponseEntity.ok("upload Success.");
		
	}
}
