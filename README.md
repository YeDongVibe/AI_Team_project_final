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