# __K3 AI PROJECT : 병 판별 분석 웹서비스 (BE)__  

+ 2023.09.14 : (예정) google 로그인 연동해보기, ,jwt 다 풀어서 실행
+ 2023.09.08 - 2023.09.13 : Flask <-> Spring 연동 성공, 나머지 api 구현다 완료함, 
+ 2023.09.07 : 파일 업로드 기능 해결, 이미지 업로드 기능 해결, Flask <-> Image captioning model 연동 진행 중
+ 2023.09.07 : (예정) 토큰 처리 완료, userLog 구현-> 기능 막아놓고 파일업로드/다운로드 기능 에러 해결, 나머지 api 기능 손보기
+ 2023.09.05 : (예정) userLog 구현, 파일업로드/다운로드 기능 에러 해결 ; 통계자료 api 구현 완료, 토큰 처리 진행 -> 확인 하기 
+ 2023.08.30 - 2023.09.04 : 게시판 API 구현 완료, Comment Api 구현 거의 다함 , 댓글 삭제 기능에 오류 있음, 파일 업로드, 다운로드 기능 좃댐.. 다 에러 뜸 
+ 2023.08.29 : fileUpload Service 코드 작성완..이지만 디비에 추가가 안됌 왜지 ?!? -> 해결 : 처음엔 columns 갯수 안맞았음 -> 그 다음엔 {} 형태에 들어가있는 쉼표 때문에 columns 안맞음 -> time이 type Error : HH:mm:dd 형식으로 맞춰야 함(9:26:05으로 하면 데이터 타입 안맞음) -> 마지막 column에 공백 있을 경우 반복문 빠져나가서 디비에 해당 데이터가 들어오지 않음 : columns 갯수가 10개 보다 작을때, 공백으로 채워줘서 오류 해결 !
+ 2023.08.28 : fileUpload service 진행 중(오류 : csv 파일의 column을 잘못 나눔) 
+ 2023.08.27 : 로그인 구현 성공, jwt 토큰 생성 후 넘겨주기(UserDetailService, securityconfig, filter etc..) : ( 이건 보류, 로그인은 나중에 하기로 함 )
+ 2023.08.25 : 403 에러 : 권한 문제 -> security 설정에서 권한 설정 추가 안해줬음.., 회원가입 구현, 로그인 구현 중.. 아직 안됨(쿼리메소드 문제인지 뭔지 모르겠음), 교피티교피티..
+ 2023.08.24 : image url 주소를 생성해 db에 저장 완료, 
+ 2023.08.23 : Flask 이용해서 DB 연동, 접속하고 test Api 구현해서 리액트와 연동시킴 (성공함 !) , img file을 로컬 디렉토리에 있는 url로 가져와서 db에 저장하기 (진행 중 ~ )
+ 2023.08.21 ~ 22 : Postgressql 이용해서 DB에 test data 넣음(Foreign Key 문제로 헤맸는데 해결 함)