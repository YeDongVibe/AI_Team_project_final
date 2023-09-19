package edu.pnu.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

import org.apache.xmlgraphics.image.loader.Image;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import edu.pnu.domain.ImageEntity;
import edu.pnu.persistence.ImageRepository;
import edu.pnu.service.FileUploadServiceImpl;
import lombok.RequiredArgsConstructor;

// restcontroller : RESTAPI를 위한 데이터를 반환하는 컨트롤러
// json & xml 형태의 데이터를 반환하는 컨트롤러에 사용
@RestController
@RequiredArgsConstructor
// @RequestMapping("/manager/files")
// 해당 컨트롤러 클래스 내의 모든 메서드에 대한 url 경로가 upload로 시작됨
public class FileUploadController {

	private final ResourceLoader resourceLoader;

	private final FileUploadServiceImpl fileUploadService;

	private final ImageRepository imgRepo;

	// Image Upload
	@Value("${upload.directory}")
	private String uploadDirectory;

	// @CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/manager/files/fileupload")
	public String uploadCSVFile(@RequestParam("file") MultipartFile file) {
		if (!file.isEmpty()) {
			try {
				if (file.getOriginalFilename().endsWith(".csv")) {
					// CSV 파일 처리 로직
					return fileUploadService.uploadCSV(file);
				} else if (file.getOriginalFilename().endsWith(".xlsx")
						|| file.getOriginalFilename().endsWith(".xls")) {
					// 엑셀 파일 처리 로직
					return fileUploadService.uploadExcel(file);
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "Error occured : " + e.getMessage();
			}
		}
		return "error ! Excel 파일만 업로드 가능합니다";
	}

	@PostMapping("/manager/files/imagefile")
	public String registerImageFile(@RequestParam("imageFile") MultipartFile imageFile) {
		List<String> imageUrls = fileUploadService.imageFileUpload(imageFile);
		return "Image registered successfully. Image URL: " + imageUrls;
	}

	@PostMapping("/manager/files/image")
	public String registerImage(@RequestParam("imageFile") MultipartFile imageFile) {
		String imageUrls = fileUploadService.imageUpload(imageFile);
		return "Image registered successfully. Image URL: " + imageUrls;
	}

	@GetMapping("/images/{filename}")
	public ResponseEntity<byte[]> getImageUrl(@PathVariable String filename) throws IOException {
		Optional<ImageEntity> imageOptional = imgRepo.findByName(filename);
		if (imageOptional.isPresent()) {
			String imageUrl = imageOptional.get().getUrl();
			String imagePath = uploadDirectory + File.separator + filename;

			// file:{imagepath} 형태로 넘겨줌
			Resource resource = resourceLoader.getResource("file:" + imagePath);
			System.out.println(resource);
			if (resource.exists()) {
				byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());
				return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
			}
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("find/imagename")
	public ResponseEntity<List<Object[]>> getImageName() {
		
		List<Object[]> image = imgRepo.findAllImageEntities();
		return ResponseEntity.ok().body(image);
	}

	// image 아이디로 찾기
	@GetMapping("/find/images/{id}")
	public ResponseEntity<byte[]> getImageUrl(@PathVariable Long id) throws IOException {
		Optional<ImageEntity> imageOptional = imgRepo.findById(id);
		System.out.println("img id " + imageOptional);
		if (imageOptional.isPresent()) {
			String imageUrl = imageOptional.get().getUrl();
			String imagePath = uploadDirectory + File.separator +
					imageOptional.get().getName();

			// file:{imagepath} 형태로 넘겨줌
			Resource resource = resourceLoader.getResource("file:" + imagePath);
			System.out.println(resource);
			if (resource.exists()) {
				byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());
				return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
			}
		}
		return ResponseEntity.notFound().build();
	}

	@Value("${image.dir}")
	private String imageDir;

	@PostMapping("/testimg")
	private ResponseEntity<String> updateImg() {
		fileUploadService.updateImgTest(imageDir);
		return ResponseEntity.ok("Image URLs updated successfully");
	}

}