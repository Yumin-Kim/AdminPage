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

   7. Modul Resolution : 모듈의 path를 resolve하는 설정
   8. baseurl : TypeScript가 complie할 때 소스 코드의 가장 상위 base directory , root directory를 설정함 다른 파일에서 import등을 하여 경로를 명시해야 할때 상대 경로를 사용하지 않아도 baseurl이 명시된 곳ㅇ르 기준으로 절대결로 처럼 시작점을 명시해준다.
   9. paths : 모듈 import시 반복되는 path를 사용하거나 깊이가 길어지면 path 길어지는것을 해결
   10. Expertimental : JavaScript에 확실히 추가된 기능은 아닐지라도 실험적인 문법 지원 기능
   11. noEmitOnError : true설정하면 에러 발생시 javascript소스 코드 , soure-maps, declartion이 dist에 생기지 않는다
   12. skipLibCheck : 사용하는 라이브러리 파일의 타입 검사를 skip하게 하며 type 검사 정확도를 조금 희생하고 컴파일 시간 줄임 true 권장
   13. noErroTruncation : 에러 메세지 잘리지 않게함
