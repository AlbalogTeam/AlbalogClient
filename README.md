# <div align="center">Albalog</div>    

### <div align="center">사장님과 알바생의 편한 업무 관리를 위한 웹앱</div>  
  

<div align="center">Albalog를 통해서 편안한 업무관리, 급여관리, 스케줄관리, 출-퇴근관리를 해보세요😁 
</div>  

<img src="https://user-images.githubusercontent.com/64634992/122313912-13b79b80-cf52-11eb-900a-a1d50bb073f9.png" />


## Albalog 기능  
  

#### 관리자  
  

- 매장 관리 ( 매장등록, 매장수정, 직원초대)  
  

- 직원 관리 ( 시급설정, 자동급여계산, 급여 내역 조회)  
  

- 스케줄 관리 ( 근무 일정 관리, 출-퇴근 관리)   
  

- 공지사항 등록  
  

- 업무 매뉴얼 관리   
  

#### 알바( or 직원)  
  

- 출-퇴근 기능  
  

- 개인/전체 스케줄 확인 , 스케줄 변경 신청  
  

- 근무 시간 조회  
  

- 급여 내역 조회  
  

- 인수인계(메모) 기능   
  

<br/>  

## UI/UX 
  완성되면 업로드😂😂😂
<br /> 


## DataBase  
  

<img src="https://user-images.githubusercontent.com/64634992/121452799-05f69900-c9db-11eb-9cc1-a8b569f6d539.png" align="left" height="450" width="1100" />    
  
📕📕
<br/>      


## API DOCS
  완성되면 업로드😂😂😂
<br /> 

## 개발 스택  
  

### Front-End  

- React  
- Redux   
- Redux-toolkit  
- SCSS  
- ckeditor5  
  
### Back-End  
  
- Nodejs  
- Expressjs  
- mongoDB  
- mongoose  
  
<br/>  

## 개발 내용

- 1주차

    ### Implements

    - 관리자 회원가입
    - 매장 등록, 수정, 입장 (kakao 주소검색 api 이용)
    - 로그인 유지, 로그아웃 (access Token + LocalStorage)
    - 관리자 로그인
    - 직원 초대 기능 (이메일 전송 )
    - 공지 등록, 수정, 삭제, 리스트 (ckEditor5를 이용하여 글쓰기 구현) 
    - 스케줄러 구현 
    - 각 페이지 접근 권한 설정 ( 관리자만 입장가능, 직원만 입장가능, 미 로그인시 접속 불가능)

    ### Issue

    - 회원가입 유효성 체크
    - 매장 삭제 부분은 넣을려다가 , 삭제를 했을 경우 해당 데이터가 다 날라가기 때문에 , 매장 status를 만들어서 운영중, 폐업 과 같은 상태로 관리하려 함
    - 로그인 부분 보안을 위해 기존 accessToken의 유효기간을 줄이고 refreshToken 도입 예정
    - 공지사항 게시물 리스트 순서를 역순으로 해야함
    - 공지사항 이미지 업로드 구현 예정
    

    ### Styles

    - 웹 메인 컬러 : rgb(18, 113, 175)로 테마 설정
    - 매장 삭제 부분은 넣을려다가 , 삭제를 했을 경우 해당 데이터가 다 날라가기 떄문에 , 매장 status를 만들어서 운영중, 폐업 과 같은 상태로 관리하려 함



## 파트 소개     
| 이름  |  메인 역할  |
|:----:|:-------:|
| [서우리](https://github.com/Alexis1226) | `프론트엔드` |
| [이도현](https://github.com/ksmfou98) | `프론트엔드` |
| [윤영훈](https://github.com/yoonyounghoon) | `프론트엔드` |
| [정원석](https://github.com/Dseok12) | `프론트엔드` |
| [김동완](https://github.com/dongwandonkim)  | `백엔드` |
| [김태희](https://github.com/godtaehee)  | `백엔드` |  

