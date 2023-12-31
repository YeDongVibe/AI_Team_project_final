package edu.pnu.controller;


import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.service.FileDownloadService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
public class FileDownloadController {

  private final FileDownloadService fileDownloadService;

   @GetMapping("/download/{filename}")
   private ResponseEntity<UrlResource> downloadImg(@PathVariable String
   fileName){
   return fileDownloadService.downloadImage(fileName);
  
   }

//  @GetMapping("/download/{filename}")
//  public String test(@PathVariable String filename, Model model) {
//    model.addAttribute("filename", fileDownloadService.downloadImage(filename));
//    return "test";
//  }
}
