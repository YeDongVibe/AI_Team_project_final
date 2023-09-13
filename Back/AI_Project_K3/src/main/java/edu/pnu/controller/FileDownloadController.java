package edu.pnu.controller;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.service.FileDownloadService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FileDownloadController {

  private final FileDownloadService fileDownloadService;

  @GetMapping("/download/{filename}")
  private ResponseEntity<UrlResource> downloadImg(@PathVariable String fileName){
    return fileDownloadService.downloadImage(fileName);
  }
}
