import { routerReducer, RouterReducerState } from '@ngrx/router-store';


export interface IAppState {
  router:RouterReducerState,
}

export const appReducer:any = {
  router:routerReducer,
};
