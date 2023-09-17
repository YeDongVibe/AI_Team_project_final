package edu.pnu.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

	public String uploadCSV(MultipartFile file);

	public String uploadExcel(MultipartFile file);

	public String imageUpload(MultipartFile file);

	public List<String> imageFileUpload(MultipartFile file);

	public void updateImgTest(String imgDir);
}
