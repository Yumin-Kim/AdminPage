# 현 폴더에서는 TypeORM을 활용할여 CRUD를 하기 위해 작성 중이다

- Node.js + Nginx 사용하는 이유

  - Nginx의 로드 벨런싱 , 이벤트 드리븐
    - 이벤트 드리븐(Event Driven)
      _ 이벤트 주도 , 기반 [ 이벤트는 명령이 아닌 관찰로 생각하자 ]
      _ EDA(Event Driven Architecture)
      _ Event Emitters : 시스템 내에서 발생하는 이벤트를 수집 , 이벤트를 받아 채널로 전달
      _ Event channels : 특정 소비자에게 이벤트를 전달 일정 수준의 전처리 수행후 소비자에게 전달
      _ Event Consumers
      _ Event-driven의 구조는 3가지로 분류
      _ 이벤트를 발생시키는 객체(EventEmitter)
      _ 이벤트를 관리하는 객체 (EventDispatcher) \* 이벤트를 발생했을 떄 실행되는 객체(EventHandler)
      ![전반적인 이벤트설계](https://media.vlpt.us/images/limprove89/post/4e43202f-62c4-458f-b04a-633ccdc144f1/Event-Driven-Architecture.png)

- CI(Connection Information - 고유)
- DI(Duplicated Information - 한 사람이 여러 계정 만듬 구글에서 한사람이 여러 계정 생성 - 식별번호동일)

- AOP Aspect oriented Programming 관점 지향 프로그래밍

  - Spring Service class 구성 간 처음과 끝 부분이 동일한 경우가 많이 존재하는데 이러한 부분을 모듈화 하여 프로그래밍 작성
  - 인프라 혹은 부가기능의 모듈화 , 대표적인 예로는 로깅 , 트랜잭션 , 보안으로 로직 구성 각각의 모듈들의 주 목적 외에 필요한 부가적인 기능들

- DTO , Vaildation을 왜 사용하는지 알아보기!!
  - DTO(Data Transfer Object)
    - 계층간 데이터 교환을 위한 객체(Java Bean)
    - 로직을 가지고 있지 않은 순수한 데이터 객체 getter / setter
    - 하지만 DB에서 꺼낸 값을 임의로 변경할 필요가 없기 때문에 setter가 없다.(대신 생성자를 통해 할당)
    - Requset 와 Response용 DTO는 View를 위한 클래스
  - Vaildation
    - 어떤 데이터의 값이 유효한지 타당한지 확인하기 위한 절차
    - 프론트에서도 진행하지만 서버단에서 진행해야지 백엔드에 쓰레기 데이터가 DB에 Insert되지 않는다.

* NestJS와 Spring 구조 매우 흡사하면 똑같다고 생각!!  
  ![전반적인 구조](https://gmlwjd9405.github.io/images/spring-framework/spring-package-flow.png)
