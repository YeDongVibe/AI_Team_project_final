# K3 AI 프로젝트 데이터 작업 일지

## 2023.09.11
- vit 모델과 gpt2 모델을 적용하여 2개의 모델을 구축 완료.

## 2023.09.10
- 모델 테스트 진행 (학습 진행까지 완료) (test10)

## 2023.09.09
- 구성한 모델 테스트 중 (데이터 구성 오류로 json 파일 재구성).

## 2023.09.08
- 모델 구성 작업 시작.

## 2023.09.07
- 이미지 처리에는 vit 모델, 텍스트 처리에는 gpt2 모델을 이용하여 작업 진행.

## 2023.09.06
- Kaggle 데이터를 활용하여 라벨을 간단히 입력하여 데이터 재구성.
- 총 2551개의 이미지와 12755개의 캡션을 생성함.

## 2023.09.05
- 데이터 수를 512개에서 2551개로 증가시킴 (Kaggle 데이터 추가 활용).

## 2023.09.04
- 9월 2일에 모델 파라미터 조정 중.
## 2023.09.02
- 이미지 처리에는 VGG16, 텍스트 처리에는 Tokenizer, LSTM을 사용하여 작업 진행 (test08).  
    ``` python 
    1. 0.0603 < batch : 5, epoch = 100, LSTM 뉴런 : 512, Embedding : 256>
    2. 0.024  < batch : 5, epoch = 150, LSTM 뉴런 : 512, Embedding : 256>
    //vocabulary 수정 -> 중복 최소화 하기 위해 구조 변경
    3. 0.0173 < batch : 5, epoch = 150, LSTM 뉴런 : 512, Embedding : 256>

    ```

## 2023.09.01
- 언어 처리는 NLTK, 인코더는 ResNet-50, 디코더는 LSTM을 사용하여 작업 진행 (test07).  
    ```python 
    1. 0.84 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 > 4단어
    -------------------GRU 사용
    2. 0.53 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 >
    3. 1.81 < embed_size = 256  hidden_size = 512  num_layers =3  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 >
    4. 1.46 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 250  print_every = 150 save_every = 10 lr = 0.0001 >
    5. 2.11 < embed_size = 256  hidden_size = 512  num_layers =2  num_epochs = 250  print_every = 150 save_every = 10 lr = 0.001 >
    ```

## 2023.08.31
- 언어 처리는 NLTK, 인코더는 ResNet-50, 디코더는 LSTM을 사용하여 작업 진행 (test07).  
    ```python 
    1. 3.3 < embed_size = 256  hidden_size = 100  num_layers =1  num_epochs = 4  print_every = 150 save_every = 1 lr = 0.001 >
    2. 1.5 < embed_size = 256  hidden_size = 100  num_layers =1  num_epochs = 50  print_every = 150 save_every = 1 lr = 0.001 >
    3. 0.9 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 100  print_every = 150 save_every = 1 lr = 0.001 >
    4. 2.5 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 100  print_every = 150 save_every = 1 lr = 0.0001 >
    5. 0.86 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 100  print_every = 150 save_every = 1 lr = 0.001 >
    6. 0.53 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 >
    ```

## 2023.08.30
- 모델을 재구성하고 NLTK, ResNet-50, LSTM을 사용하여 기초 작업 진행.

## 2023.08.29
- 캡셔닝 모델 초안을 구축하고 자연어 처리 모델에 도전함. 한국어를 영어로 번역하여 데이터 분석 시도.

## 2023.08.27
- 캡션 관련 학습 진행.

## 2023.08.26
- 이미지 모델 구축 진행.

## 2023.08.25
- 이미지 학습 모델 초안을 구축.

## 2023.08.24
- 이미지의 상세 모사 작업 진행 중. 회원가입 동작 구현 (백엔드 지원).

## 2023.08.23
- 데이터베이스 스키마 구축 및 데이터 연동 테스트.

## 2023.08.21 ~ 22
- 이미지 캡션을 위한 데이터셋 준비 진행.