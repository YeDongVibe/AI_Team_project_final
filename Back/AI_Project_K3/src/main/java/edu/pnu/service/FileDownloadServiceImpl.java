package edu.pnu.service;

import java.net.MalformedURLException;
import java.util.Optional;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pnu.domain.ImageEntity;
import edu.pnu.persistence.ImageRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileDownloadServiceImpl implements FileDownloadService {

	private final ImageRepository imageRepo;

	@Override
	public ResponseEntity<UrlResource> downloadImage(String fileName) {

		Optional<ImageEntity> findFile = imageRepo.findByName(fileName);
		ImageEntity img = findFile.orElse(null);
		if (img == null)
			return null;

		String storeFileName = img.getName();
		String img_url = img.getUrl();

		// http response header(HTTP 응답 헤더) 속성으로 HTTP Response Body에 담겨진 값을 설정해줌
		// 브라우저에 표시되는지 첨부파일로 표시되어 다운로드 할것인지 정하는 속성
		String contentDisposition = "attachment; filename=\"" + storeFileName + "\"";
		UrlResource resource;
		try {
			resource = new UrlResource("file:" + img_url);

			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition).body(resource);

		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return null;
	}

}
