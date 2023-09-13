package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AiProjectK3ApplicationTests {

	@Test
	public void test() {
		System.out.println(splitString("3629,1,\"{\"\"paper\"\": 1, \"\"plastic\"\": 1}\",2023-08-17,11:52:39,f,,,가"));
	}

	private String[] splitString(String line) {
		List<String> list = new ArrayList<>();
		String[] columns = line.split(",");
		StringBuffer sb = new StringBuffer();
		boolean flag = true;
		for (String col : columns) {
			if (col.charAt(0) == '"') {
				flag = false;
			}
			if (flag) {
				list.add(col);
			} else {
				sb.append(col);
				if (col.charAt(col.length() - 1) == '"') {
					flag = true;
					list.add(sb.toString());
				}
			}
		}
		return (String[]) list.toArray();
	}

}
