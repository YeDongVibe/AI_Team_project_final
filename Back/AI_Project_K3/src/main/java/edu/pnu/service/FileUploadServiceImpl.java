package edu.pnu.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.pnu.domain.ImageEntity;
import edu.pnu.domain.RecycleRes;
import edu.pnu.domain.Recycling;
import edu.pnu.persistence.ImageRepository;
import edu.pnu.persistence.RecycleResultRepository;
import edu.pnu.persistence.RecyclingRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FileUploadServiceImpl implements FileUploadService {

	private final RecyclingRepository recyclingRepo;

	private final RecycleResultRepository recycleResRepo;

	private List<String> splitString(String line) {
		List<String> list = new ArrayList<>();
		String[] columns = line.split(",");
		StringBuffer sb = new StringBuffer();
		int flag = 0;
		// {} 형태의 데이터가 들어가있는 column을 따로 추출 ('{}'안에 쉼표가 들어가 있음)
		for (String col : columns) {
			if (col.isEmpty()) {
				list.add(col);
				continue;
			}
			if (col.substring(0, 1).equals("\"")) {
				flag = 1;
			}
			if (flag == 0) {
				list.add(col);
			} else {
				if (flag == 1) {
					sb.append(col);
					flag++;
				} else if (flag == 2) {
					sb.append("," + col);
				}
				if (col.substring(col.length() - 1).equals("\"")) {
					flag = 0;
					list.add(sb.toString());
				}
			}
		}
		// columns의 갯수가 10개보다 작을때, 공백으로 채워줌
		for (int i = list.size(); i < 10; i++) {
			list.add("");
		}
		return list;
	}

	// json형태의 column은 나머지 기호 다 제거하고 str, int 형으로 각각 저장
	private Map<String, Integer> parseJsonString(String jsonStr) {
		Map<String, Integer> result = new HashMap<>();
		if (jsonStr == null) {
			result.put("etc", 0);
			return result;
		}
		String jsonStr1 = jsonStr.replace("\"", "");
		if (jsonStr1.equals("{}") || !jsonStr1.startsWith("{") || !jsonStr1.endsWith("}")) {
			result.put("etc", 0);
		} else {
			jsonStr1 = jsonStr1.substring(1, jsonStr1.length() - 1);
			String[] keyValuePairs = jsonStr1.split(",");
			for (String pair : keyValuePairs) {
				String[] keyValue = pair.split(":");
				if (keyValue.length == 2) {
					result.put(keyValue[0].trim(), Integer.parseInt(keyValue[1].trim()));
				}
			}
		}
		return result;
	}

	// read csv file -> insert DB
	@Transactional
	@Override
	public String uploadCSV(MultipartFile file) {

		try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"))) {
			// List<Recycling> dataList = new ArrayList<>();
			// ObjectMapper objMapper = new ObjectMapper();

			String line;
			br.readLine(); // header skip
			while ((line = br.readLine()) != null) {
				// split을 기준으로 columns 자름(근데 csv 파일인데 뭐가 기준인건지 모르겠다..)

				List<String> columns = splitString(line);

				// true인 경우, reason이 공백이기 때문에 바로 반복문 빠져나가서 종료됨, column 사이즈가 9보다 작기때문에 패싱당
				if (columns.size() < 9) {
					// 예상하는 컬럼 수보다 적을 경우 처리 (로그 출력 등)
					continue;
				}

				Long detect_log_id = Long.parseLong(columns.get(0));
				Long device_id = Long.parseLong(columns.get(1));
				String jsonStr = columns.get(2);
				LocalDate date = LocalDate.parse(columns.get(3));
				// time이 HH:mm:dd로 정확하게 들어가야해서 그렇게 맞춰줌
				if (columns.get(4).length() < 8) {
					// columns.set(4, "0" + columns.get(4));
					String[] tList = columns.get(4).split(":");
					StringBuffer sb = new StringBuffer();
					for (int i = 0; i < tList.length; i++) {
						if (i != 0) {
							sb.append(":");
						}
						if (tList[i].length() == 2) {
							sb.append(tList[i]);
						} else {
							sb.append("0" + tList[i]);
						}
					}

					columns.set(4, sb.toString());
				}
				LocalTime time = LocalTime.parse(columns.get(4));
				String state = columns.get(5);
				Integer ce = columns.get(6).isEmpty() ? 0 : Integer.parseInt(columns.get(6));
				Integer rm = columns.get(7).isEmpty() ? 0 : Integer.parseInt(columns.get(7));
				String reason = columns.get(8);

				// gyo pt 에게 부탁..
				// Parse Json data
				// JsonNode jsonNode = objMapper.readTree(jsonStr);
				// save total_recycle DB
				Recycling recycle = new Recycling();

				recycle.setDetect_log_id(detect_log_id);
				recycle.setDevice_id(device_id);
//				recycle.setAi_result(columns.get(2).isEmpty() ? null : jsonStr);
				recycle.setDate(date);
				recycle.setTime(time);
				recycle.setState(state);
				recycle.setCe(ce);
				recycle.setRm(rm);
				recycle.setReason(columns.get(8).isEmpty() ? null : reason);

				recyclingRepo.save(recycle);

				// call parseJsonStr
				Map<String, Integer> parseData = parseJsonString(jsonStr);
				System.out.println("parseData : " + parseData);

				// save result_list DB
//				RecycleRes res = new RecycleRes();
//				res.setDetect_log_id(device_id);
//				for(String key : parseData.keySet()) {
//					res.setCategory(key);
//					res.setCount(parseData.get(key));
//					
//					recycleResRepo.save(res);
//				}	-> problem : 객체를 반복문안에서 계속 사용하므로 새 객체가 계속 생성됨?

				// save result_list DB
				// db에 추가 안됨 와이..
				// RecycleRes 엔티티 저장
				for (String key : parseData.keySet()) {
					RecycleRes res = new RecycleRes();
					res.setDetect_log_id(recycle);
					if (key == null || key.isEmpty()) {
						res.setCategory(null);
					} else if (key == "{}") {
						res.setCategory(null);
					} else {
						res.setCategory(key);
					}
					res.setCount(parseData.get(key));

					recycleResRepo.save(res);
					System.out.println("res : " + res);
				}

			}

			br.close();

			return "Upload Success";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error Occurred : " + e.getMessage();
		}

	}

	// readExcel
	@Override
	public String uploadExcel(MultipartFile file) {
		if (!file.isEmpty()
				&& (file.getOriginalFilename().endsWith(".xlsx") || file.getOriginalFilename().endsWith(".xls"))) {
			try (InputStream inputStream = file.getInputStream()) {
				Workbook workbook = new XSSFWorkbook(inputStream);

				Sheet sheet = workbook.getSheetAt(0);
				Iterator<Row> rowIter = sheet.iterator();
				if (rowIter.hasNext()) {
					rowIter.next();
				}
				// 엑셀 셀 데이터 타입에 따라 처리
				while (rowIter.hasNext()) {
					Row row = rowIter.next();
					Cell detectLogID = row.getCell(0);
					Cell deviceId = row.getCell(1);
					Cell jsonStr = row.getCell(2);
					Cell date = row.getCell(3);
					Cell time = row.getCell(4);
					Cell state = row.getCell(5);
					Cell ce = row.getCell(6);
					Cell rm = row.getCell(7);
					Cell reason = row.getCell(8);

					// 셀 데이터를 추출하여 필요한 처리를 수행
					double detectLogId = detectLogID.getNumericCellValue();
					Long detectLog = (long) detectLogId;
					double deviceID = deviceId.getNumericCellValue();
					Long detect_Id = (long) deviceID;
					// =======
					String ai_res = jsonStr.getStringCellValue();
					Double numericDate = date.getNumericCellValue();
					// 여기에 이상한 값이 들어가있음?? 오잉 도잉
					LocalDate dates = LocalDate.parse(numericDate.toString(),
							DateTimeFormatter.ofPattern("yyyy-MM-dd"));
					// =======
					// 시간 데이터 형식 맞추기
					LocalTime times;
					if (time.getCellType() == CellType.NUMERIC) {
						Double timeN = time.getNumericCellValue();
						String timeString = String.valueOf(timeN);
						if (timeString.length() < 8) {
							String[] tList = timeString.split(":");
							StringBuilder sb = new StringBuilder();
							for (int i = 0; i < tList.length; i++) {
								if (i != 0) {
									sb.append(":");
								}
								if (tList[i].length() == 2) {
									sb.append(tList[i]);
								} else {
									sb.append("0" + tList[i]);
								}
							}
							timeString = sb.toString();
						}
						times = LocalTime.parse(timeString, DateTimeFormatter.ofPattern("HH:mm:ss"));
					} else {
						times = LocalTime.parse(String.valueOf(time.getNumericCellValue()),
								DateTimeFormatter.ofPattern("HH:mm:ss"));
					}
					String states = state.getStringCellValue();
					Integer ce_1 = (int) ce.getNumericCellValue();
					Integer rm_1 = (int) rm.getNumericCellValue();
					String reasons = reason.getStringCellValue();

					// CSV 파일의 splitString 함수를 통해 각 열의 데이터를 가공하여 추출
					List<String> columns = splitString(ai_res);
					// JSON 데이터를 parseJsonString 함수를 통해 가공하여 추출
					Map<String, Integer> parseData = parseJsonString(columns.get(0));

					// Recycling 엔티티 생성 및 저장
					Recycling recycle = new Recycling();
					recycle.setDetect_log_id(detectLog);
					recycle.setDevice_id(detect_Id);
					recycle.setDate(dates);
					recycle.setTime(times);
					recycle.setState(states);
					recycle.setCe(ce_1);
					recycle.setRm(rm_1);
					recycle.setReason(reasons);

					recyclingRepo.save(recycle);

					// RecycleRes 엔티티 저장
					for (String key : parseData.keySet()) {
						RecycleRes res = new RecycleRes();
						res.setDetect_log_id(recycle);
						if (key == null || key.isEmpty()) {
							res.setCategory(null);
						} else {
							res.setCategory(key);
						}
						res.setCount(parseData.get(key));

						recycleResRepo.save(res);
					}

				}

				workbook.close();
				return "upload Success";
			} catch (Exception e) {
				e.printStackTrace();
				return "Error occurred : " + e.getMessage();
			}
		} else {
			return "Invalid Excel File";
		}
	}

	// Image Upload
	@Value("${upload.directory}")
	private String uploadDirectory; // 이미지를 저장할 경로

	private final ImageRepository imageRepo;

	@Override
	public String imageUpload(MultipartFile file) {

		// 이미지를 서버에 저장하고 이미지 URL을 반환
		String imageFileName = file.getOriginalFilename();
		String imagePath = uploadDirectory + File.separator + imageFileName;

		// 이미지 저장
		try {
			file.transferTo(new File(imagePath));
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			System.out.println("error occured : " + e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("error occured : " + e.getMessage());
			e.printStackTrace();
		}

		// 이미지 URL 생성
		String imageUrl = "http://localhost:8080/images/" + imageFileName;

		ImageEntity img = new ImageEntity();
		img.setUrl(imageUrl);
		img.setName(imageFileName);

		imageRepo.save(img);

		return imageUrl;
	}
	
	@Override
	public List<String> imageFileUpload(MultipartFile folder) {
		List<String> imageUrls = new ArrayList<>();

		try {
			// 폴더에서 이미지 추출
			File folderPath = new File(uploadDirectory + File.separator + folder.getOriginalFilename());
			folder.transferTo(folderPath);

			File[] listOfFiles = folderPath.listFiles();

			if (listOfFiles != null) {
				for (File file : listOfFiles) {
					if (file.isFile() && isImage(file.getName())) {
						// 이미지 파일일 경우에만 처리
						String imageFileName = file.getName();
						String imagePath = uploadDirectory + File.separator + imageFileName;

						// 이미지 저장
						Files.move(file.toPath(), new File(imagePath).toPath());

						// 이미지 URL 생성
						String imageUrl = "http://localhost:8080/images/" + imageFileName;
						imageUrls.add(imageUrl);

						ImageEntity img = new ImageEntity();
						img.setUrl(imageUrl);
						img.setName(imageFileName);

						imageRepo.save(img);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return imageUrls;
	}

	private boolean isImage(String fileName) {
		String[] validExtensions = { "jpg", "jpeg", "png", "gif" };
		for (String ext : validExtensions) {
			if (fileName.toLowerCase().endsWith(ext)) {
				return true;
			}
		}
		return false;
	}

}