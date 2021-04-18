# REST API , JSON 설계

---

## REST API(100명 기준)

## page마다 카테고리 제공 API 구성필요

- /api

  - **/user** (인원 관리 카테고리) 이미지 관련 로직 여기서 처리

    - GET /
      - 전반적인 회원 정보 가지고옴
      * querystring offset limit
      - return Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | []
    - GET /filter/human
      - 인원의 정보를 세밀하게 조회 할 수 있는 기능 , 조회는 누적으로 개발에 주의!!
      ```
      export interface IBasicQuery{
          offset:number;
          limit:number;
      }
      export interface IFilterHumanQuery{
          host?:boolean;
          memberIndex?:number;
          phoneNumber?: string;
      }
      ```
      - return Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | []
    - GET /filter/room/< detail:'group' | 'groupByGroup'>
      - 방에 대한 정보를 통해 인원들 정보 조회
      ```
      export interface IBasicQuery{
          offset:number;
          limit:number;
      }
      :group
      export interface IFilterRoomQuert{
          minWeight?:number; 10 - 30 높은것들 모두
          maxWeight?:number; 50 - 100 적은것들 모두
          name?:number; 입력한 동수보다 작은것들
          pricing?:number; 입력금액보다 적은것들 모두
          roomCount?:number; 해당 하는 갯수
      }
      :groupbygroup
      export interface IFilterGroupBy{
          name?:number; 입력한 호수보다 작은것들
          repairCount? : number;
          pricing?:number; 입력금액보다 적은것들 모두
      }
      ```
      - 조회후 데이터 숫자가 바뀌도록 >> 최대 평수 50 - 100 > 조회후 > 87 >> 95 이런식으로 변경
      * return Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | []
    - GET /filter/info/human/:detail : ('group' | 'groupByGroup')
      - 동 또는 호 , 인원 세부정보 조회를 동시에 실행 할 시
      ```
      export interface IBasicQuery{
          offset:number;
          limit:number;
      }
      :group
      export interface IFilterRoomQuert{
          minWeight?:number; 10 - 30 높은것들 모두
          maxWeight?:number; 50 - 100 적은것들 모두
          name?:number; 입력한 동수보다 작은것들
          pricing?:number; 입력금액보다 적은것들 모두
          roomCount?:number; 해당 하는 갯수
      }
      :groupbygroup
      export interface IFilterGroupBy{
          name?:number; 입력한 호수보다 작은것들
          repairCount? : number;
          pricing?:number; 입력금액보다 적은것들 모두
      }
      ```
      - return Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | []

    * GET /filter/info/human/group/groupbygroup
      - 모든 테이블 활용하여 조회
      ```
      export interface IFilterRoomQuert {
          minWeight?: number;
          maxWeight?: number;
          name?: number;
          pricing?: number;
          roomCount?: number;
      }
      export interface IFilterFullTable extends IFilterRoomQuert {
          offset?: number;
          limit?: number;
          c_name?: number;
          c_pricing?: number;
          repairCount?: number;
      }
      ```
      - return return Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | []

    - PATCH /changed/< id:string>
      - 특정 정보를 선택하여 특정 부분을 수정 전 URL 기억후 다시 요청하여
      ```
      body
      export class UpdateUserDto {
          readonly name?: string;
          readonly memeberIndex?: number;
          readonly host?: boolean;
          readonly birth?: Date;
          readonly phoneNumber?: string;
      }
      ```
      - return (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity)
    - DELETE /deleted
      - 특정 정보 row 선택하여 삭제
      - querystring {"id":int} , offset값을 통해서 삭제후 offset+1의 row데이터를 가지고온다
      - Business Logic
      - 해당 id값을 통해 컬럼 삭제
      - 삭제 후 한 row 선택하여
      * return (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity)
    - GET /outter
      - 외부 출입자 조회
      - querystring (("offset",int),("limit",int))
      - group 과 groupBygroup ,admin 테이블을 통해서 조인을 한 정보 전달
      - return Array < { ...OutterEntitiy,user:IUserEntity , group:IGroupEntity , groupbygroup:IGroupByGroupEntity } >
    - GET /exit
      - 웹 소켓 활용 예정

  ***

  - **/admin**

    - GET /dashboard
      - 공지사항 정보
      * querystring = offset , limit // token
      * return Array< Dashboard extends admin , group >

    * PATCH /dashboard
      ```
      body
      class UpdateDashBoardDto {
        id?: number;
        title?: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        }
        token
      ```
      - return Dashboard extends admin , group
    * DELETE /dashboard/:id&offset={}
      - querystring offset , pathname id
      - return Dashboard extends admin , group
    * POST /dashboard
      - 공지사항을 등록 할 수 있는 기능
        ```
        body
        class CreateDashBoardDto {
            title: string;
            description: string;
            createdAt: Date;
            updatedAt?: Date;
            deletedAt?: Date;
            adminId: number;
            groupId: number;
        }
        token
        ```
        - return Dashboard extends admin , group

    - POST /login
      - 로그인
      - body(form) {email : string , password : string}
      - return { message:string , data: { name : string , email:string , day.id:[1,2,3] }}
    - POST /siginup
      - 회원가입 프론트에서 담당 동 선택할 수 있도록
      ```
      class SignUpUserDto {
        name: string;
        password: string;
        email: string;
        group: number;
        M_days: number[];
        }
      ```
      - return {message : string}
    - POST /logout --- 미구현 프론트 구현후 다시
      - 로그아웃
      - return { message:string }
    - /registering

      - POST /inner

        - 신규 회원 등록

        ```
        export class RegisterInnerUser {
            name: string;
            memberIndex: number;
            host: boolean;
            createdAt: Date;
            birth: Date;
            group: number;
            groupbygroup: number;
            phoneNumber: string;
        }
        ```

        - return {message : string}

      - POST /outter

        - 외부인 등록 프론트에서 동 호 선택할 수 있게 리스트 보여줌

        ```
        export class RegisterOutterUser {
            name: string;
            description: string;
            createdAt: Date;
            phoneNumber: number;
            username: string;
            group: number;
            groupbygroup: number;
        }
        ```

        - return { message : string }

        * /inner/upload
          - inner 이미지등록 이미지 명은 passport를 활용하여 사용자 정보를 받은후 사용자의 id or 이미지 id를 활용하여 파일 명 변경
          * return {message : "success"}
        * /inner/uploads
          - inner 이미지등록 이미지 명은 passport를 활용하여 사용자 정보를 받은후 사용자의 id or 이미지 id를 활용하여 파일 명 변경
          * return {message : "success"}

    * /chart

      - GET /user
        - 사용자 정보 통계 낼수 있는 정보로 전달 0~100동까지 offset값은 변경하지 않고 limit값을 변경하는 방법으로 구현 필요
        - querystring offset limit
        -
        - return
        ```
        export class ResultChartUser {
            minGroupId: number;
            maxGroupId: number;
            totalCount: number;
            userTable: UserTableChart;
        }
        export interface UserTableChart {
            host: {
                [hostInfo in 'false' | 'true']: number;
            };
            memberIndex: {
                [key in '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: number;
            };
            }
        ```
      - GET /parking/:startpoint/:endpoint
        - startpoint ~ endpoint 사이의호의 주차 db에서 조회 하여 return
        * return Array< Array< parkingInfoEntitiy extends Group , user > | [] >
      - GET /exituser
        - querystring year date 로 부터 count를 입력시 count는 그후 몇개를원하는지 조회 가능
        ```
        querystring을 통해 전달
        export interface DateChart {
            year: number;
            date: number;
            count: number;
        }
        ```
        - return Array<{length:number,admissionTime:Data}>

    * GET /totalcount

    - 총인원수 , 민원내역 총수 , 주민 투표 총수

    ```
    querystring
    export const TotalTable = [
    'user',
    'group',
    'groupbygroup',
    'image',
    'imageoutter',
    'outter',
    'admin',
    'votingInfo',
    'parkingInfo',
    ] as const;
    export type U_TotalTable = typeof TotalTable[number];
    export type TotalTableClass = Record<U_TotalTable, boolean>;
    ```

    - return Record< U_TotalTable , number>

  ***

  - /voting (주민 투표 카테고리)

    - GET /
      - querystring offset , limit
      * return Array<{...IVotingEntity , user: IUserEntity , group : IGroupByGroupEntity , groupbygroup:IGroupByGroupEntity}>

    * POST /

      - 주민 투표 정보 등록 (동 , 호는 selectBox를 통해서 전달)

      ```
        const votingInfoList = ['title', 'description', 'createdAt', 'name'] as const;
        export type IRegisterVotingInfoDto = Record<typeof votingInfoList[number],number | string | Date>;
      ```

      - return { message : string }

    * GET /progress

      - 진행중인 주민 투표 정보 조회
      - querystring [("limit" , string),("offset",string)]
      - return Array<{...IVotingEntity , user: IUserEntity , group : IGroupByGroupEntity , groupbygroup:IGroupByGroupEntity}>

    * GET /deadline
      - 마감된 주민 투표 조회
      ```
        querystring
        export const dateInfo = ['year', 'date', 'nextyear', 'nextdate'] as const;
        export type T_dateInfo = Record<typeof dateInfo[number], string>;
      ```
      - Business Logic
        - 현재 날짜와 비교하여 현재날짜보다 지난 데이터를 가지고 온다.
        - querystring을 통해 조회
      - return ArrayArray<{...IVotingEntity , user: IUserEntity , group : IGroupByGroupEntity , groupbygroup:IGroupByGroupEntity}>

  ***

  - **/petitions** (민원 관리 센터 카테고리)

    - GET /
      - querystring offset , limit , kind typeof petitionKind[number ]
      ```
      export const petitionKind = [
          'facility requested',
          'Report requested',
          'Other matter requested',
      ] as const;
      ```
      - 테이블 kind별로 나눠서 데이터 보여주는 것도 괜찮을듯
      * return Array< IpetitionEntity>

    * PATCH /stage/:id
      - id값을 전달하면 자동으로 다음 단계로 변동 가능
      - return IpetitionEntity >> 불변성 지켜서 redux 상태 관리 주의

  ***

  - **/facility** (시설관리 카테고리)
    - GET /
      - 전반적인 이용내역확인
      - querystring ("limit" , string) , ("offset",string)
      - return Array< ...IFacilityInfoTable,M_facilityroomlist:facilityroomlist[] | [] ,M_facilitytoollist : facilitytoollist[] | [] >
    * GET /toolslist
      - 항목만 조회(시설 기자재)
      - querystring ("limit" , string) , ("offset",string)
      - return Array< IFacilityToolsListTable>
    - GET /roomlist
      - 전반적인 이용 내역확인
      - querystring ("limit" , string) , ("offset",string)
      - return Array< Ifacilitytoollist[]>

  ***

  - **/pricing** (관리비 고지 관리 카테고리) - 간략하게 마무리
    - GET /
      - 단순히 정보 조회만 가능하게 구현
      - querystring {limit : int } ,{ offset : int }
      - return Array< ...IPricingEntitiy ,user : IUserEntity , group: IGroupEntity , groupbygroup:IGroupByGroupEntity >
    * GET /detail/:id
      - 간단하게 조회 가능
      * :id를 통해 해당하는 테이블 정보 전달
      * return Array< ...IPricingEntitiy ,user : IUserEntity , group: IGroupEntity , groupbygroup:IGroupByGroupEntity >

  ***

  - **/usercar** (차량 및 주차 관리)
    - GET/
      - 정보 조회
      - querystring : offset ,limit
      - return Array< ...IUserCarEntity,user:IUserEntity , group:IGroupEntity , groupbygroup:IGroupByGroupEntity >
    * GET /filter
      - querystring을 통한 하나 조건으로 정보 조회(차량 번호 , 입력 날짜 , 차종 , 동 , 호 , 이름 )
      ```
      querystring
      class UserCarQueryDto {
        public carCode: string;
        public createdAt: Date;
        public kind: string;
        public group: number;
        public groupbygroup: number;
        public user: string;
      }
      ```
      - return Array< ...IUserCarEntity,user:IUserEntity , group:IGroupEntity , groupbygroup:IGroupByGroupEntity >
    - WebSocket을 활용하여 주차 정보 제공(실시간 영상 처리한 데이터가 배열로 전송 될것으로 예상된다.)

# dto

```
  interface IFacilityInfoTable {
    user.name : string;
    group.name : int;
    groupByGroup.name : int;
    petitions.stage : string;
    petitions.kind : string;
    facility_List.admins.name : string;

    createdAt : Date;
    updatedAt : Date | Null;
    deletedAt : Date | Null;
    description : string;
    quarity: int;
  }

  interface IFacilityToolsListTable{
    name : string;
    pricing : int;
    createdAt : Date;
    updatedAt : Date | Null;
    deletedAt : Date | Null;
    stock? : int;
  }

  interface IFacilityRoomsListsTable extends IFacilityToolsListTable{
    title : string;
    capacity : int
    employment : int;
  }

```

```

Interface IUserBasicInfo{
  user.name : string;
  group.name : int;
  groupByGroup.name : int;
}

```
