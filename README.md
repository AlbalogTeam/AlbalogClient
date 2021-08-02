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

#### 알바

- 출-퇴근 기능
- 개인/전체 스케줄 확인 , 스케줄 변경 신청
- 근무 시간 조회
- 급여 내역 조회
- 인수인계(메모) 기능

<br/>

## 프로젝트 데모 & 시연


<br />

## DataBase

<div>
<img src="https://user-images.githubusercontent.com/44861205/122632213-57ee9b80-d10c-11eb-9bad-b6125c2ca389.jpeg" align="left" height="450" width="1100" />    
</div>

## API DOCS

완성되면 업로드😂😂😂
<br />

## 개발 스택

### Front-End

- React
- React-Router
- Redux
- Redux-toolkit
- SCSS

### Back-End

- Nodejs
- Expressjs
- mongoDB
- mongoose

<br/>

## 프로젝트 실행 방법

- https://github.com/AlbalogTeam/AlbalogClient
- https://github.com/AlbalogTeam/AlbalogServer

<br />

### 필수 구성 요소

- Node.js
- MongoDB

### 설치

1. 프로젝트 클론

```
$ git clone "https://github.com/AlbalogTeam/AlbalogClient.git"
$ git clone "https://github.com/AlbalogTeam/AlbalogServer.git"
```

2. 패키지 설치

- 프론트

```
$ cd albalog-client
$ npm install
```

- 백앤드

```
$ npm install
```

3. Server .env 설정

```
집가서 추가
```

4. 서버 실행

- 프론트

```
$ cd albalog-client
$ npm start
```

- 백앤드

```
$ npm start
```

## 개발 내용

<details>
<summary>1주차</summary>

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

</details>

<details>
<summary>2주차</summary>

### Implements

- 직원 로그인, 회원가입
- 관리자가 직원 시급정보 수정
- 업무메뉴얼 CRUD
- 직원 대시보드
- 직원 출퇴근
- 매장 직원 리스트 나열
- 백엔드 테스트 배포

### Fix

- 공지사항 최신순 나열
- 각 페이지 접근권한 설정
- 스케줄 Date 전송 방식

### Issue

- _회원가입 유효성 체크_
- _공지사항 이미지_
- embedded document 쿼리 방식

### Styles

- 매장 UI 수정
- 로그인 페이지 UI 수정
- favicon 제작

</details>

<details>
 <summary>3주차</summary>

### Implements

- 인수인계 조회, 등록, 수정, 삭제
- 출근, 퇴근 기능
- 공지사항 검색
- 직원,관리자 개인정보 변경
- 직원 스케줄 등록
- 직원 스케줄 조회

### Fix

- 관리자 / 알바 로그인 분리를 하나로 통합
- 공지사항 최신순 나열
- 기존 로그인 방식 LocalStorage -> SessionStorage로 변경
- 공지사항, 업무매뉴얼 제목 작성부분 autoComplete = "off" 설정
- 직원 초대 url 토큰으로 변경 (유효기간 1일), 유저 계정, 유저 이름 변경 불가로 설정
- 업무 매뉴얼 페이지 카테고리 관리를 위한 카테고리 설정 추가
- 업무 매뉴얼 카테고리에 속한 매뉴얼이 있을 경우 삭제 안되게 설정

### Styles

- messageModal 생성
- header, aside 반응형으로 구현
- mobile category page 구현
- No data 이미지 삽입

### Issue

- 스케줄 등록 하루씩 밀림

</details>

<details>
 <summary>4주차</summary>

### Implements

- 관리자 스케줄 추가
- 직원 스케줄 확인 ( 개인, 전체 )
- 직원 계정정보 페이지 내 급여 확인
- 직원 일한시간 페이지
- 관리자 급여관리
- 회원가입 유효성 (프론트 + 백앤드)
- 비밀번호 찾기

### Fix

- 출퇴근 부분 : 기존 프론트단에서 기록하던 시간을 서버에서 기록하도록 변경
- 기존 업무매뉴얼 삭제버튼 클릭시, 매뉴얼 존재하면 삭제 안됐던걸 그래도 삭제하시겠습니까로 변경
- 비밀번호 없이 직원 계정정보 수정 가능
- 관리자페이지 직원이 없을경우 employee 정보가 없어서 랜더링 오류 - 해결

### Styles

- 인수인계 UI 수정

### Issue

- payroll 날짜 sort

</details>

<details>
 <summary>5주차</summary>
 
### Implements

- 직원 일한시간 당월 전후 달 조회
- 직원 대시보드 개인스케줄 확인
- 관리자 대시보드 공지사항, 인수인계 조회

### Fix

- 일한시간, payroll 날짜 sort
- 출근 누르고 퇴근 누르지 않은 상태에서 payroll 부분 들어갈시 에러나는거 해결

### Issue

### Styles

- 회원가입 페이지 반응형 구현
- 로그인 페이지 반응형 구현

</details>

<details>
 <summary>6주차</summary>

### Implements

- 관리자 대시보드 (출근전, 근무중, 퇴근) 상태보기
- 기존 유저 다른 매장에 가입하기
- 기간 지난 토큰(1시간) 에 접속시 "유효하지 않은 주소 입니다" 출력
- 스케줄 삭제 (하루, 전체)
- 랜딩페이지 헤더 생성
- 알바 대시보드 전체스케줄

### Fix

- axios 중복 요청 막기
- 재직 유무 (radio 버튼으로 변경)
- 서버 히로쿠(너무느림!) -> 아마존 웹서버로 변경
- 스케줄 추가시 (오후 3시 ~ 오전 5시 하면 그날 오전 5시~ 오후3시 이랬는데 오후3시 ~ 다음날 오전5시로 나오게 설정)
- payroll 날짜 역순
- 직원 계정정보, 일한시간 페이지 timezone issue 해결

### Styles

- 스케줄 이름 구분하기 쉽게 색 추가
- 직원 대쉬보드 내 전체 스케줄 UI 변경
- 출퇴근 시 모달창 추가

</details>

<details>
 <summary>7주차</summary>

- 테스트 및 오류해결
</details>
