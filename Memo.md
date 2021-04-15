# 프론트 개발을 위한 기능 명세서?
* 해당 개발에서 사용될 스팩
    * React
    * Redux , Redux-Saga (상태 관리 라이브러리)
    * TypeScript
    * Antd
    * Styled-Components

---

# 기능 명세서
* 랜딩
    * 로그인 / 회원가입
        * API.md 참고
* 메인
    * 즐겨 찾기 기능[ RESTAPI 수정 ] 
        * /api/user/category
            ```
                return [{
                    title:"차량관리",
                    description:"카테고리 설명글",
                },...]
            ```
        * title , description내용을 가지고 진행하며 마우스 오버시  description이 보이며 dropdown형태로 즐겨찾기를 진행한다. 
        * 즐겨 찾기에 담기는 데이터는 LocalStorage에 JSON형태로 저장되며 해당 링크로 요청을 보내는 경우는 localStorage에 정보 없을때만 요청을 보낸다.
        * DB 연동 없이 진행 하며 LocalStorage를 활용하여 저장하여 UI보여줄 예정
        * <a href="https://www.npmjs.com/package/react-beautiful-dnd">해당 라이브러리 사용</a>
    * 차트 정보 
    * 총인원수 정보
    * 관리자 정보 공지사항
    * 추천 검색 
    * 실시간 검색 순위
    * 외부인 , 신규 회원 등록
* 