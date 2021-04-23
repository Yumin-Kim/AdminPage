# store
1. 비동기 요청을 받은 정보 기록
2. 로딩될 상태 관리 변수 (요청 성공 실패 로딩)단계를 state로 분리  
3. //////// 
```
userStore :{
     usersInfo : Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | [],
     usersInfoLoading : false,
     validfilterOption : false,
     filterHumanInfo:Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | [],
     filterHumanInfoLoading : false, 
     filterGroupInfo : Array< (...IUserEntity , group : IGroupEntitiy , groupbygroup : IGroupByGroupEntity) | []> | [].
     filterGroupInfoLoading: false,
     //현재 history를 통해 주소를 얻어 온다 , remotePath: 
    changeUserInfoLoading : false,
    changeUserInfoSuccess:false,
    changeUserInfoError : false,
    deleteUserInfoLoading : false,
    deleteUserInfoSuccess:false,
    deleteUserInfoError : false,
    outterInfo: Array < { ...OutterEntitiy,user:IUserEntity , group:IGroupEntity , groupbygroup:IGroupByGroupEntity } >,
    outterInfoLoading:false,
}

adminStore : {
    dashboardInfo: Array< Dashboard extends admin , group >,
    dashboardInfoLoading: false,
    updateDashboardInfoLoading:false,
    updateDashboardInfoError:false,
    updateDashboardInfoSuccess:false,
    createDashboardInfoLoading:false,
    createDashboardInfoError:false,
    createDashboardInfoSuccess:false,
    
    adminsInfo:{

    },
    loginInfo:{
    "user": {
            id: 1,
            name: "Oralia Normanvell",
            password: "iitLY0E5Eqzn",
            email: "onormanvell0@webeden.co.uk",
            group: IGroupEntity,
            M_days: Array<{id: 5,name: 5}>
    },
    token: string
}
}

votingstore

petitionStore

facilityStore

pricingStore

usercarStore
````
