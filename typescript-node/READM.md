# 해당 폴더는 TypeScript를 사용하기 위해서 만들었습니다!!

# tsconfig.json 주요 설정

1. File Inclusion
   - include [ 포함 원하는 파일 ], exclude [ 제외 할 파일 ]
   - complile에 포함하거나 제거할 파일들을 명시
2. Complier Options

   - Project Options
     - complie 되는 방식 , 동작 하는 방식 설정
     1. lib : lib는 target과 함께 사용되기도 함 , lib는 타입 스크립트는 built-in JS API(ex-Math)와 브라우저 환경(document)등에서 사용할 수 있는 타입을 기본적으로 제공. JS버전마다 사용할 수 있는 문법이나 API등이 조금씩 다르며 보통 계속 추가되면서 호환성 유지
        - NodeJS경우 dom 제외 NodeJS에서 어떤 버전을 지원할 경우에 따라 달라 지며
     2. target : TypeScript가 컴파일되는 결과물인 JavaScript 코드로 변환되는 버전을 결정 , Node.JS를 운영할 것이라면 버전에 맞춰서 지정하면된다. 프론트 개발자라면 브라우저 버전에 맞게 target을 설정한다.
     3. allowJS : .ts파일에서 .js파일 import 할 수 있게 제공
     4. removeComments : TypeScript코드를 JavaScript로 컴파일 시킬때 주석을 모두 제거하는 옵션
     5. sourceMap : sourcemap file(xxx.js.map)을 생성할 것인지 유무 설정 , 디버깅이 필요한 개발 환경이 라면 true
     6. strict Check : Type을 얼마나 엄격하게 검사 할지를 검사하는 옵션 총 8개 존재
        - strict
          - 타입 에러가 발생하게 잡아 준다.해당 옵션을 모두 사용하게 된다.
        - alwaysStrict
          - strict과 비슷해서 헷갈릴 수 있으며 ECMAScript strict모드를 사용하게 된다. true권장
            - **ECMAScript는 스크립팅 언어를 어떻게 만들어야 하는지를 설명하는 일종의 설명서라고 생각하면 되고,JavaScript는 ECMAScript를 사양을 바탕으로 만들어진 언어인 것이다**
        - noImplicityAny
          - 해당 옵션을 false하게 되면 argument등의 type을 명시하지 않으면 argument는 any로 type이 추론된다. true권장
        - noImplyCityThis
          - this의 context가 any를 추론하게 된다면 현재 객체의 context가 아니라는것을 뜻하게 된다 true권장
        - strictBindcallApply
          - TypeScript가 call , bind , apply를 사용할때 함수 , 메소드의 argument의 타입을 추론 하여 사용할 수 있게 된다.true 권장
        - strictFunctionTypes
          - 옵션을 켜면 함수 , 메소드의 argument의 타입을 더 정확히 추론하여 사용 true 권장
        - strictNullChecks
          - strictNullChecks 옵션이 꺼져 있다면 null 또는 undefined 체킹이 무시되는데 이것은 런타임 에러를 발생 시킬 가능성이 크다. 컴파일 시간에 이런 에러를 잡지 못하면 보통 오타 , 값의 미대입등으로 존재하지 않는 개체의 속성 값이 없는 속성에 접슪는 경우가 많이 발생 하기 때문에 true권장
        - strictPropertyInitialzation
          - 옵션을 켜두면 초기화되지 않는 클래스의 멤버 변수에 대해 에러를 발생 시킨다. 초기화 시키는 방법으로는 속성에 기본값을 대입하거나 생성자에서 대입하는 두가지 방법존재

3. Modul Resolution : 모듈의 path를 resolve하는 설정
4. baseurl : TypeScript가 complie할 때 소스 코드의 가장 상위 base directory , root directory를 설정함 다른 파일에서 import등을 하여 경로를 명시해야 할때 상대 경로를 사용하지 않아도 baseurl이 명시된 곳ㅇ르 기준으로 절대결로 처럼 시작점을 명시해준다.
5. paths : 모듈 import시 반복되는 path를 사용하거나 깊이가 길어지면 path 길어지는것을 해결
6. Expertimental : JavaScript에 확실히 추가된 기능은 아닐지라도 실험적인 문법 지원 기능
7. noEmitOnError : true설정하면 에러 발생시 javascript소스 코드 , soure-maps, declartion이 dist에 생기지 않는다
8. skipLibCheck : 사용하는 라이브러리 파일의 타입 검사를 skip하게 하며 type 검사 정확도를 조금 희생하고 컴파일 시간 줄임 true 권장
9. noErroTruncation : 에러 메세지 잘리지 않게함

# Typescript에서의 interfaace와 class 차이
* class는 동일한 구성을 공유하는 객체를 만들 수 있는 blueprint다. interface는 객체를 설명하는 관련 속성 및 메소드의 그룹이지만 구현이나 초기화는 제공하지 않는다.
* 두 구조는 모두 객체가 어떻게 생겼는지 정의하기 때문에 두개 모두 타입스크립트에서 변수의 타입을 체크하는 용으로 쓰일 수 있다. >> 클래스나 인터페이스 중 무엇을 사용할지는 **사용 케이스에 따라 다르며 타입체크만 하는 경우 새로운 인스턴스를 생성하거나 아니면 둘다 해야면 클래스를 사용하면 타입을 채크하고 구현(인스턴스 생성)까지  할 수 있지만 인터 페이스를 통해서는 할 수 없다.**
* TypeScript class
  * ES6부터 class를 사용할수 있으며 타입 체크와 정적 프로퍼티같은 추가 기능으로 js 클래스를 향상시킨다.
  * 인스터스를 생성할 필요가 없을 떄 interface사용하는것이 편리하다.
  * 강력한 타이핑을 위해 디자인 및 컴파일 시간 동안 사용되는 유형을 정의 할 수 있으며 추가로 런타임 동안 사용
* TypeScript interface
  * 클래스와 달리 인터페이스는 TypeScript컨텍스트 내에만 존재하는 가상 구조
  * TypeScript컴파일러는 타입 체크 목적으로만 인터페이스를 사용한다.(JavsScript로 트랜스파일 후에는 코드에서 인터페이스는 사라진다.)
  * interface는 선언만 존재하며 속성 과 method는 선언 할 수 있지만 접근 제한자는 설정할수 없다.
  * interface간의 다중 상속이 가능하다.
  * **인터페이스 사용 시기 : 둘 이상의 위치, 특히 둘 이상의 파일 또는 함수에서 사용될 객체의 속성 및 함수 타입을 지정하기 위해서**
* **클래스는 프로퍼티 초기화 와 메소드 구현을 제공함으로써 팩토리나 싱글톤을 정의 할 수 있었던 반면 인터페이스는 객체의 프로퍼티를 정의하는 단순히 구조 계약이다.**

### 커스텀 객체를 생성할 필요가 있으면서 타입체크의 이점을 얻으려면 클래스를 사용 , 인스턴스를 생성하지 않을 경우에는 인터페이스를 사용 할수 있는데 트랜스파일된 자바스크립트에서는 코드를 생성하지 않으면서 가상으로 타입체크를 할 수 있다.






