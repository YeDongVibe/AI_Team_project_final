import json
import os

# 파일 경로 및 이름 설정
train_data_file = "train_data.txt"
test_data_file = "test_data.txt"
val_data_file = "val_data.txt"

data_file = "cleaned_trash_renew.txt"

train_json_file = "train_renew_YeDong.json"
test_json_file = "test_renew_YeDong.json"
val_json_file = "val_renew_YeDong.json"

# 이미지와 캡션을 저장할 리스트 초기화
images = []
annotations = []

# 이미지 파일 이름을 저장할 집합 초기화
image_filenames = set()

# 이미지 파일과 캡션 데이터를 읽어와서 처리
with open(data_file, 'r') as data_file:
    for line in data_file:
        image_name, caption = line.strip().split('/')
        
        # 이미지 파일 이름이 이미 리스트에 있는 경우
        if image_name in image_filenames:
            continue
        
        # 이미지 정보 추가
        image_info = {
            "image_id": len(images) + 1,
            "caption_id": len(annotations) + 1,
            "caption": caption,
            "height": 800,  # 이미지 높이 설정
            "width": 600,   # 이미지 너비 설정
            "file_name": image_name,
            "coco_url": f"https://example.com/images/{image_name}",
            "image_path": f"/content/drive/MyDrive/Colab Notebooks/test09finalimg/{image_name}"
        }
        images.append(image_info)
        
        # 캡션 정보 추가
        annotation_info = {
            "image_id": len(images),
            "id": len(annotations) + 1,
            "caption": caption
        }
        annotations.append(annotation_info)
        
        # 이미지 파일 이름 추가
        image_filenames.add(image_name)

# 분류된 데이터를 JSON 파일로 저장
def save_json(file_name, data):
    with open(file_name, 'w') as json_file:
        json.dump(data, json_file)

# train, test, val 데이터 분류 및 저장
# train_data_file, test_data_file, val_data_file에서 이미지 파일 이름을 읽어와서 분류합니다.
train_images = []
test_images = []
val_images = []

with open(train_data_file, 'r') as train_file:
    train_image_names = train_file.read().splitlines()

with open(test_data_file, 'r') as test_file:
    test_image_names = test_file.read().splitlines()

with open(val_data_file, 'r') as val_file:
    val_image_names = val_file.read().splitlines()

for image_info in images:
    if image_info["file_name"] in train_image_names:
        train_images.append(image_info)
    elif image_info["file_name"] in test_image_names:
        test_images.append(image_info)
    elif image_info["file_name"] in val_image_names:
        val_images.append(image_info)

# 출력 - 각 데이터 세트의 이미지 개수
print(f"Train 데이터 세트의 이미지 개수: {len(train_images)}")
print(f"Test 데이터 세트의 이미지 개수: {len(test_images)}")
print(f"Val 데이터 세트의 이미지 개수: {len(val_images)}")

# 각각의 데이터를 JSON 파일로 저장
train_data_dict = {
    "info": {
        "description": "YeDong 2023 Dataset",
        "url": "http://cocodataset.org",
        "version": "1.0",
        "year": 2023,
        "contributor": "LeeYeJin",
        "date_created": "2023-09-09"
    },
    "licenses": [
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
    ],
    "images": train_images,
    "annotations": annotations
}

test_data_dict = {
    "info": {
        "description": "YeDong 2023 Dataset",
        "url": "http://cocodataset.org",
        "version": "1.0",
        "year": 2023,
        "contributor": "LeeYeJin",
        "date_created": "2023-09-09"
    },
    "licenses": [
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
    ],
    "images": test_images,
    "annotations": annotations
}

val_data_dict = {
    "info": {
        "description": "YeDong 2023 Dataset",
        "url": "http://cocodataset.org",
        "version": "1.0",
        "year": 2023,
        "contributor": "LeeYeJin",
        "date_created": "2023-09-09"
    },
    "licenses": [
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
    ],
    "images": val_images,
    "annotations": annotations
}

# JSON 파일로 저장
save_json(train_json_file, train_data_dict)
save_json(test_json_file, test_data_dict)
save_json(val_json_file, val_data_dict)
