import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';


export interface IAppState {
  router:RouterReducerState,
}

export const appReducer: ActionReducerMap<IAppState> = {
  router:routerReducer,
};
