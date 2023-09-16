# __병 판별 분석 웹서비스__  

## 1. 프로젝트 설명  
> **부산대학교 k - digital 3기** <br/> **개발기간 : 2023.08.18 ~ 2023.09.18**    

## 2. 팀원  
  
|      Front - End       |          Back - End         |          DA         |                                                              
|:------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | 
| 이수호 | 허지은 | 이예진 |
|<img width="120" alt="image" src="https://avatars.githubusercontent.com/u/50311505?v=4">|<img width="120" alt="image" src="https://avatars.githubusercontent.com/u/112235808?v=4">|<img width="120" alt="image" src="https://avatars.githubusercontent.com/u/129818886?v=4">| 
|   [@suho0815](https://github.com/suho0815)  |     [@JIeunhuh](https://github.com/JIeunhuh)  |    [@YeDongVibe](https://github.com/YeDongVibe)  |


##  프로젝트 소개   
 
##  시작 가이드(요구사항, 설치 및 실행)        


## -- 추가 될 수 있음 --  
    
##  기술 스택  

## REST API  
### Spring Boot  
| ID | Method | URI | Description |
| --- | --- | --- | --- |
| 1 | POST  | /signup |회원가입 |
| 2 | POST | /login | 로그인 |
| 3 | POST | /manager/files/fileupload | 파일 업로드 |
| 4 | GET | /images/{filename} | 이미지 보기 |
| 5 | GET | /public/download/{filename} | 이미지 다운로드 |
| 6 | POST | /manager/files/image | 이미지 업로드|
| 7 | POST | /manager/files/imagefile | 이미지 폴더 업로드 |
| 8 | GET | /public/download/{filename} | 이미지 다운로드 |
| 9 | GET | /public/statistics/readAllrecycles | 모든 재활용 데이터 자료조회 |
| 10 | GET | /public/statistics/types/{types} | 분리수거 카테고리별 통계 |
| 11 | GET | /public/statistics/times/{time}/{time2} | 시간별 통계 |
| 12 | GET | /public/statistics/days/{day}/{day2} | 일자별 통계 |
| 13 | POST | /public/board/insertBoard | 게시판 게시글 등록 |
| 14 | PUT | /public/board/updateBoard/{id} | 게시판 게시글 수정 |
| 15 | DELETE | /public/board/deleteBoard/{id} | 게시글 삭제 |
| 16 | GET | /public/board/boardList | 게시글 목록 보기 |
| 17 | GET | /public/board/searchBoard/nickname | 게시글 검색(사용자 id 검색) |
| 18 | GET | /public/board/searchBoard/title | 게시글 검색(게시글 제목 검색) |
| 19 | GET | /public/board/searchBoard/keyword | 게시글 검색(게시글 제목 + 내용 검색) |
| 20 | POST | /manager/comments/insertComment | 게시글 댓글 작성 |
| 21 | PUT | /manager/comments/updateComment/{id} | 게시글 댓글 수정 |
| 22 | DELETE | /manager/comments/deleteComment/{id} | 게시글 댓글 삭제 |
| 23 | GET | public/comments/readComment/{id} | 댓글 목록 |
| 24 | POST | manager/prediction/put_image | 이미지 분석 캡션 반환|  
  
### Flask
| ID | Method | URI | Description |
| --- | --- | --- | --- |
| 1 | POST | /process_image | 이미지 캡셔닝 |

## ERD  
```mermaid
erDiagram
    TOTAL_RECYCLE{
        Long detect_log_id
        Long device_id
        String state
        LocalDate date
        Localtime time
        Integer ce
        Inter rm
    }

    RESULT_LIST{
        Long id
        String category
        Integer count
        TOTAL_RECYCLE detect_log_id
    }

    IMAGE{
        Long id
        String caption
        String name
        String url
        TOTAL_RECYCLE logid
    }

    USER_DB{
        Long id
        String authority
        Date birth
        String name
        String username
        String password
        String email
    }

    BOARD{
        Long id
        String content
        USER_DB username
        String title
        Date date
        Time time
    }

    COMMENT{
        Long id
        String content
        Date date
        Time time
        USER_DB username
        BOARD boardid
    }

    USER_DB ||--o{ BOARD : writes
    USER_DB ||--o{ COMMENT : writes
    BOARD ||--o{ COMMENT : has
    TOTAL_RECYCLE ||--o{ RESULT_LIST : has
    TOTAL_RECYCLE ||--o{ IMAGE : has

```

##  주요 기능   


##  아키텍쳐   