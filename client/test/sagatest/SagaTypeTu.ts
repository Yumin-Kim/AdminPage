import axios from 'axios';
import { call, put, take } from 'redux-saga/effects';

type ApiEndPoint<R, P extends any[]> = (...p: P) => Promise<R>;

/**
 * API/ 데이터 모델
 */
interface IUser {
  username: string;
  id: number;
}

const getUserAPI = async (userId: number) => {
  return (await axios.get<IUser>(`/user/${userId}`)).data;
};

/**
 * 액션 타입
 */

const GET_USER = 'GET_USER' as const;
const USER = {
  REQUEST: 'GET_USER_REQUEST',
  SUCCESS: 'GET_USER_SUCCESS',
  FAILURE: 'GET_USER_FAILURE',
} as const;

/**
 * 액션 크리에이터
 */

interface IEntity<R, S, F> {
  REQUEST: R;
  SUCCESS: S;
  FAILURE: F;
}

const createEntityAction = <R, S, F, PARAM extends any[], DATA>(
  entitiy: IEntity<R, S, F>,
  api: ApiEndPoint<DATA, PARAM>,
) => ({
  ACTION: {
    REQUEST: () => ({ type: entitiy.REQUEST }),
    SUCCESS: (data: DATA) => ({ type: entitiy.SUCCESS, payload: data }),
    FAILURE: () => ({ type: entitiy.FAILURE }),
  },
  API: api,
});

interface IEntityAction {
  ACTION: {
    REQUEST: (...p: any[]) => any;
    SUCCESS: (...p: any[]) => any;
    FAILURE: (...p: any[]) => any;
    [key: string]: (...p: any[]) => any;
  };
  API: ApiEndPoint<any, any>;
}
type EntityAction<T extends IEntityAction> = ReturnType<T['ACTION'][keyof T['ACTION']]>;

const getUser = (userId: string) => ({ type: GET_USER, payload: { userId } });
type GetUser = ReturnType<typeof getUser>;

const userEntity = createEntityAction(USER, getUserAPI);
type UserEntity = EntityAction<typeof userEntity>;

type UserActions = GetUser | UserEntity;

/**
 * 사가
 */
function fetchEntity<T extends IEntityAction>({ ACTION, API }: T) {
  return function* (...p: Parameters<T['API']>) {
    try {
      yield put(ACTION.REQUEST());
      //////////////////////////
      const data: Generator = yield call(API, ...p);
      //////////////////////////
      yield put(ACTION.SUCCESS(data));
    } catch {
      yield put(ACTION.FAILURE());
    }
  };
}

const getUserSaga = fetchEntity(userEntity);
export interface ResponseGenerator<T> {
  config?: any;
  data: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* getUserWatcher() {
  while (true) {
    const {
      payload: { userId },
    }: GetUser = yield take(GET_USER);
    //////////////////////////
    yield call((getUserSaga as unknown) as any, userId);
    //////////////////////////
  }
}

/**
 * 리듀서
 */

interface IUserStore {
  userData: IUser | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'FAILURE';
}

const initialState: IUserStore = {
  userData: null,
  status: 'INIT',
};

const user = (state: IUserStore = initialState, action: UserActions): IUserStore => {
  switch (action.type) {
    case USER.REQUEST: {
      return {
        ...state,
        status: 'LOADING',
      };
    }
    case USER.SUCCESS: {
      return {
        userData: action.payload,
        status: 'SUCCESS',
      };
    }
    case USER.FAILURE: {
      return {
        ...state,
        status: 'FAILURE',
      };
    }
    default: {
      return state;
    }
  }
};
