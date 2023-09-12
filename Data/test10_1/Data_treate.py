import json
import os

# 데이터 파일 경로
data_file = "./cleaned_trash.txt"

# 이미지 디렉토리 경로
image_dir = "C:/Ye_Dong/AI_Project_Img_Captioning-1/test10/test09finalimg"

# Train 데이터 파일 경로
train_data_file = "train_data.txt"

# Test 데이터 파일 경로
test_data_file = "test_data.txt"

# val 데이터 파일 경로
val_data_file = "val_data.txt"

# Train 데이터를 저장할 JSON 파일 경로
train_json_file = "train_renew_vs.json"

# Test 데이터를 저장할 JSON 파일 경로
test_json_file = "test_renew_vs.json"

# val 데이터를 저장할 JSON 파일 경로
val_json_file = "val_renew_vs.json"

# 이미지 이름을 저장할 집합 (중복된 이름 방지)
unique_image_names = set()

# 함수 정의: 데이터를 JSON 형식으로 저장하는 함수
def save_data_to_json(data, json_file):
    with open(json_file, 'w') as json_output_file:
        json.dump(data, json_output_file, indent=4)

# 데이터 처리 함수
def process_data(data_file, output_json_file, split_name):
    data_images = []
    data_annotations = []

    with open(data_file, 'r') as data_file:
        data = data_file.read().splitlines()

    for i, line in enumerate(data):
        # 이미지 파일 이름만 있는 경우, 캡션을 빈 문자열로 설정
        image_name = line.strip()
        caption = ""

        # 이미지 파일 경로 설정
        image_path = os.path.join(image_dir, image_name)
        image_path = image_path.replace("\\", "/")

        image_info = {
            "image_id": i + 1,
            "caption_id": i + 1,
            "caption": caption.strip(),
            "height": 800,  # 이미지의 높이 정보를 수정하세요
            "width": 600,   # 이미지의 너비 정보를 수정하세요
            "file_name": image_name,
            "coco_url": f"https://example.com/images/{image_name}",
            "image_path": image_path
        }
        data_images.append(image_info)

        annotation_info = {
            "image_id": i + 1,
            "id": i + 1,
            "caption": caption.strip()
        }
        data_annotations.append(annotation_info)

    data_json = {
        "info": info,
        "licenses": licenses,
        "images": data_images,
        "annotations": data_annotations
    }

    save_data_to_json(data_json, output_json_file)
    print(f"{split_name} JSON file saved.")


# info 섹션 구성
info = {
    "description": "YeDong 2023 Dataset",
    "url": "http://cocodataset.org",
    "version": "1.0",
    "year": 2023,
    "contributor": "LeeYeJin",
    "date_created": "2023-09-09"
}

# licenses 섹션 구성
licenses = [
    {
        "url": "http://creativecommons.org/licenses/by-nc-sa/2.0/",
        "id": 1,
        "name": "Attribution-NonCommercial-ShareAlike License"
    },
    {
        "url": "http://creativecommons.org/licenses/by-nc/2.0/",
        "id": 2,
        "name": "Attribution-NonCommercial License"
    }
    # 필요한 만큼 라이선스 정보를 추가할 수 있습니다.
]

# 데이터 처리
process_data(train_data_file, train_json_file, "Train")
process_data(test_data_file, test_json_file, "Test")
process_data(val_data_file, val_json_file, "Val")