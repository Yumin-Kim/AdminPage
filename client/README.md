# store

1. 비동기 요청을 받은 정보 기록
2. 로딩될 상태 관리 변수 (요청 성공 실패 로딩)단계를 state로 분리
3. ////////

```
const initialState = {
    userStore :{
        usersInfo : Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | [],
        usersInfoLoading : false,
        validfilterOption : false,
        filterHumanInfo:Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | [],
        filterHumanInfoLoading : false,
        filterGroupInfo : Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | [].
        filterGroupInfoLoading: false,
        changeUserInfoLoading : false,
        changeUserInfoSuccess:false,
        changeUserInfoError : false,
        deleteUserInfoLoading : false,
        deleteUserInfoSuccess:false,
        deleteUserInfoError : false,
        outterInfo: Array < { ...OutterEntitiy,user:IUserEntity , group:IGroupEntity , groupbygroup:IGroupByGroupEntity } >,
        outterInfoLoading:false,
    },
    adminStore : {
        dashboardInfo: Array< Dashboard extends admin , group >,
        dashboardInfoLoading: false,
        updateDashboardInfoLoading:false,
        updateDashboardInfoError:false,
        updateDashboardInfoSuccess:false,
        createDashboardInfoLoading:false,
        createDashboardInfoError:false,
        createDashboardInfoSuccess:false,
        regiaterInnerInfoLoading : false,
        regiaterOutterInfoLoading : false,
        adminsInfo:{
            user: {
                    id: 1,
                    name: "Oralia Normanvell",
                    password: "iitLY0E5Eqzn",
                    email: "onormanvell0@webeden.co.uk",
                    group: IGroupEntity,
                    M_days: Array<{id: 5,name: 5}>
            },
            token: string
        }
        chartInfo : {
            userChartInfo:{
                data : Array<UserTableChart>,
                loding : false,
            },
            parkingChartInfo : {
                data : Array< Array< parkingInfoEntitiy extends Group , user >> |[] ,
                loading : false
            }
            exitUserChartInfo : {
                data : Array<{length:number,admissionTime:Data}>,
                loaging : false
            }
            totalCountInfo : {
                data : Record< U_TotalTable , number> ,
                loadging : false
            }
        }
    },
    //현 votingStore에는 loadging state를 따로 기록 하지 않고 진행 한다.
    votingstore :{
        votingInfo : Array<{...IVotingEntity , user: IUserEntity , group : IGroupByGroupEntity , groupbygroup:IGroupByGroupEntity}>,
        votiugInfoLoading:false,
        votingRegisteringLoading:false,
        votingProgressInfo : Array<{...IVotingEntity , user: IUserEntity , group : IGroupByGroupEntity , groupbygroup:IGroupByGroupEntity}>,
        votingDeadlineInfo : Array<{...IVotingEntity , user: IUserEntity , group : IGroupByGroupEntity , groupbygroup:IGroupByGroupEntity}>
    },
    petitionStore :{
        petitionsInfo : Array< IpetitionEntity>,
        updatePetitionLoading: false
    },
    facilityStore : {
        facilitysInfo : Array< ...IFacilityInfoTable,M_facilityroomlist:facilityroomlist[] | [] ,M_facilitytoollist : facilitytoollist[] | [] >
        facilitysToolList :  Array< IFacilityToolsListTable>,
        facilitysRoomList : Array< Ifacilitytoollist[]>
    },
    pricingStore :{
        pricingInfo : Array< ...IPricingEntitiy ,user : IUserEntity , group: IGroupEntity , groupbygroup:IGroupByGroupEntity >,
        detailInfo : {...IPricingEntitiy ,user : IUserEntity , group: IGroupEntity , groupbygroup:IGroupByGroupEntity}
    },
    usercarStore : {
        usercarInfo : Array< ...IUserCarEntity,user:IUserEntity , group:IGroupEntity , groupbygroup:IGroupByGroupEntity >,
        filterUsercarInfo : Array< ...IUserCarEntity,user:IUserEntity , group:IGroupEntity , groupbygroup:IGroupByGroupEntity >,
    }
//현재 history를 통해 주소를 얻어 온다 , remotePath:
}


```
