package edu.pnu.service;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;

public interface FileDownloadService {

	public  ResponseEntity<UrlResource> downloadImage(String fileName);
}
