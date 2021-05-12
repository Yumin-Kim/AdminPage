# AdminPage
관리자 페이지 제작 Flask_Detector를 NestJS , React [TypeScript]로 개발할 예정이다. 상태 관리 라이브러리로는 Redux ,Redux-Saga를 사용 할 것이다.  

---

## 해당 프로젝트 다른 기술을 활용하여 구현하려 한다.
* <a href="https://github.com/Yumin-Kim/FlaskServer_FaceDetector">README.md</a>아래 링크를 기반으로 구현 하려 한다.
* <a href= "https://github.com/Yumin-Kim/FlaskServer_FaceDetector/blob/master/API.md">API.md</a>과 같이 RESTAPI를 간단히 설계하여 진행하였다.
* <a href="https://github.com/Yumin-Kim/FlaskServer_FaceDetector/blob/master/Memo.md">MEMO.md</a>는 간단히 페이지에 어떻게 데이터를 보여줄지 간단히 기록해보았다.
* **관련 Repository**
    * <a href="https://github.com/Yumin-Kim/OpenCV-Android-Face_recognition-">안드로이드 기반 얼굴 인식 ,판별(영상처리 기반) 및 통신(RTSP)</a>
    * <a href="https://github.com/Yumin-Kim/RTSP_Node.js_Server">안드로이드 기반 얼굴 인식 ,판별(AI) 및 통신(RTSP >> HTTP/HTTPS)</a>
    * <a href="https://github.com/Yumin-Kim/FlaskServer_FaceDetector">얼굴인식을 통한 알고리즘 포함된 관리자 서버 설계 및 미구현</a>
---

## 목표 // 기간

* **목표** 
    * 해당 프로젝트를 통해서 TypeScript와 친숙해지며 다양한 UI라이브러리를 사용하며 Custom하는 방식으로 진행하려 한다.
    * 부족한 css를 custom하면서 진행할 예정이다.
    * React , Redux , Redux-saga를 상기하기 위해 진행
* **개발 기간**
    * 시작 기간 : 2021 . 02 .17 ~
    * 재시작 기간 : 2021 .04 .05
    * 마감 예정 기간 : 2021 . 06 . 05 생각중!!
    * 1차 서버 개발 정리 : 2021 . 04 . 15 

---

## TodoList
1. 2021 04 15
    * 이전 <a href="https://github.com/Yumin-Kim/FlaskServer_FaceDetector/blob/master/API.md">API.md github</a>사이트와 같이 백엔드를 구성하였지만 return JSON의 값이 명확하게 정의 되지 않아 정리가 안됨
    * 현재 서버에서 응답해주는 데이터 타입이나 정보를 정리요함
    * 진행 순서
        1. 서버 응답 데이터 타입 정보 정의 >> 정의하지 않으면 프론트 type에 어려움 발생 예정
        2. 프론트 기능명세서 작성 및 return 타입 정의 >> 향후 Redux 활용에 편리
        3. 간단한 디자인 진행
        4. 프론트 개발 시작 
2. 2021 04 28
   * 현재 리액트에 익숙해지기 위해서 토이 프로젝트 진행
   * useEffect , useCallback , useContextAPI , useReducer로만 개발 
   * 상태 관리 라이브러리는 최대한 사용하지 않고 진행중
   * 리액트 라이프 사이클 또한 이해하며 진행중
   * 최근 JavaScript로 개발한 경험이 적어 사용하는 메소드만 사용중이지만 이런 부분도 수정 필요

### 개발에 있어 필요한 자료
* <a href="https://medium.com/crocusenergy/nestjs-typeorm-%EA%B8%B0%EB%B3%B8-crud-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-69b9640dc826">NestJS , TypeORM관련 포스팅</a>이며 기초 잘설명되어 있다.
* <a href="https://stackoverflow.com/questions/48180282/how-to-populate-a-heroku-postgresql-database-with-a-sql-file">Heroku에 임의의 SQL파일을 집어 넣을수 있는 stackoverflow 자료</a>
---

