package edu.pnu.controller;

import java.util.Map;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import edu.pnu.domain.ImageEntity;
import edu.pnu.persistence.ImageRepository;
import edu.pnu.service.FlaskCallService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/manager/prediction")
public class FlaskConnectController {

	private final FlaskCallService flaskService;

	private final ImageRepository imgRepo;

	@PostMapping("/put_image")
	public ResponseEntity<String> processImage(@RequestParam(name = "img", required = false) MultipartFile imgFile) {
//	    String imageUrl = requestBody.get("image_url");
		try {
			// Flask 서버에 이미지 URL 전송
			String flaskResponse = flaskService.sendImageToFlask(imgFile);

			// Flask 서버에서 받은 응답을 JSON으로 파싱
			// 예시: {"caption": "Generated caption for the image"}
			JSONObject jsonResponse = new JSONObject(flaskResponse);
			String caption = jsonResponse.getString("caption");

			// 이미지 캡션을 저장
			ImageEntity imgEntity = imgRepo.findByName(imgFile.getOriginalFilename()).orElse(new ImageEntity());
			imgEntity.setCaption(caption);
			imgRepo.save(imgEntity);

			return ResponseEntity.ok(caption);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error processing image : " + e.getMessage());
		}
	}

	@GetMapping("/caption")
	public ResponseEntity<String> receiveCaption(@RequestBody Map<String, String> json) {
		String caption = json.get("caption");
		ImageEntity imgEntity = new ImageEntity();
		imgEntity.setCaption(caption);
		imgRepo.save(imgEntity);

		return ResponseEntity.ok("upload Success.");

	}
}
