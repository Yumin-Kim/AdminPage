import { AxiosError } from 'axios';
import { AdminStore } from '@typings/admin';

export type ApiEndPoint<R, P extends any[]> = (...p: P) => Promise<R>;
export interface IEntity<R, S, F> {
  REQUEST: R;
  SUCCESS: S;
  FAILURE: F;
}

export const createEntityAction = <R, S, F, PARAM extends any[], DATA>(
  entitiy: IEntity<R, S, F>,
  api: ApiEndPoint<DATA, PARAM>,
) => ({
  ACTION: {
    REQUEST: (data: DATA) => ({ type: entitiy.REQUEST, payload: data }),
    SUCCESS: (data: ReturnType<ApiEndPoint<DATA, PARAM>>) => ({ type: entitiy.SUCCESS, payload: data }),
    FAILURE: (error: any) => ({ type: entitiy.FAILURE, payload: error }),
  },
  API: api,
});
export const createAction = <R, S, F, PARAM extends any[], DATA>(
  entitiy: IEntity<R, S, F>,
  api: ApiEndPoint<DATA, PARAM>,
) => ({
  ACTION: {
    REQUEST: (data: PARAM[number]) => ({ type: entitiy.REQUEST, payload: data }),
    SUCCESS: (data: DATA) => ({
      type: entitiy.SUCCESS,
      payload: data,
    }),
    FAILURE: (error: Error) => ({ type: entitiy.FAILURE, payload: error }),
  },
  API: api,
});

export interface IEntityAction {
  ACTION: {
    REQUEST: (...p: any[]) => any;
    SUCCESS: (...p: any[]) => any;
    FAILURE: (...p: any[]) => any;
    [key: string]: (...p: any[]) => any;
  };
  API: ApiEndPoint<any, any>;
}

export type EntityAction<T extends IEntityAction> = ReturnType<T['ACTION'][keyof T['ACTION']]>;
