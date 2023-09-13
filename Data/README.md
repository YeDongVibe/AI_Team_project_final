# __K3 AI PROJECT : 병 판별 분석 웹서비스 (DATA)__  

+ 2023.09.11 : vit 모델, gpt2 적용하여 2개의 모델 구축완료.
+ 2023.09.10 : 모델 테스트.(학습진행까지는 완료.) (test10)
+ 2023.09.09 : 구성한 모델 테스트(데이터 구성 오류로 json파일 재구성.)
+ 2023.09.08 : 모델 구성
+ 2023.09.07 : 이미지 : vit, 텍스트 : gpt2 모델 이용
+ 2023.09.06 : Kaggle 데이터의 라벨을 간단히 입력하여 데이터 재 구성. 
    + 총 2551개의 이미지와 12755개의 caption생성.
+ 2023.09.05 : 데이터 512개에서 2551개로 증가(Kaggle데이터 추가 이용)
+ 2023.09.04 : 9월 2일 모델 파라미터 조정 중. 
+ 2023.09.02 : 이미지 : VGG16, 텍스트 : Toeknizer, LSTM (test08)
    1. 0.0603 < batch : 5, epoch = 100, LSTM 뉴런 : 512, Embedding : 256>
    2. 0.024  < batch : 5, epoch = 150, LSTM 뉴런 : 512, Embedding : 256>
    //vocabulary 수정 -> 중복 최소화 하기 위해 구조 변경
    3. 0.0173 < batch : 5, epoch = 150, LSTM 뉴런 : 512, Embedding : 256>
    + => 여전히 결과 불만족.

+ 2023.09.01 : 언어처리 : NLTK, 인코더 : ResNet-50, 디코더 : LSTM 이용 (test07)
    1. 0.84 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 > 4단어
    -------------------GRU 사용
    2. 0.53 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 >
    3. 1.81 < embed_size = 256  hidden_size = 512  num_layers =3  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 >
    4. 1.46 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 250  print_every = 150 save_every = 10 lr = 0.0001 >
    5. 2.11 < embed_size = 256  hidden_size = 512  num_layers =2  num_epochs = 250  print_every = 150 save_every = 10 lr = 0.001 >
        + => 모델 변경 결심.

+ 2023.08.31 : 언어처리 : NLTK, 인코더 : ResNet-50, 디코더 : LSTM 이용 (test07)
    1. 3.3 < embed_size = 256  hidden_size = 100  num_layers =1  num_epochs = 4  print_every = 150 save_every = 1 lr = 0.001 >
    2. 1.5 < embed_size = 256  hidden_size = 100  num_layers =1  num_epochs = 50  print_every = 150 save_every = 1 lr = 0.001 >
    3. 0.9 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 100  print_every = 150 save_every = 1 lr = 0.001 >
    4. 2.5 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 100  print_every = 150 save_every = 1 lr = 0.0001 >
    5. 0.86 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 100  print_every = 150 save_every = 1 lr = 0.001 >
    6. 0.53 < embed_size = 256  hidden_size = 512  num_layers =1  num_epochs = 150  print_every = 150 save_every = 10 lr = 0.001 >
    + => loss는 작게 나오나, 결과가 좋지 않음. 배경 묘사도 안됨.

+ 2023.08.30 : 모델 재구성(NLTK, ResNet-50, LSTM) 기초 작업
+ 2023.08.29 : 캡셔닝 모델 초안 구축, nlp처리 모델 도전 ~~!! -> 한 -> 영 번역해서 데이터 분석시도
+ 2023.08.27 : Caption 관련 학습
+ 2023.08.26 : Img 모델 구축
+ 2023.08.25 : Img 학습 모델 초안 구축
+ 2023.08.24 : Img의 상세 모사 작업 중. 회원가입 동작 구현(Back support)
+ 2023.08.23 : DB 스키마 구축 및 데이터 연동 Test.
+ 2023.08.21 ~ 22 : IMG Captioning을 위한 데이터 셋 준비.