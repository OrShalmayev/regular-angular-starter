import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRouterStateUrl } from "./custome-serializer";

export const getRouterState = createFeatureSelector<RouterReducerState<IRouterStateUrl>>('router');

export const getCurrentRoute =  createSelector(getRouterState, router => {
    return router?.state;
})


// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { ngrxRouterFeatureKey, RouterStateUrl, State } from './router.state';

// // Main selector
// const getRouterState = createFeatureSelector<State>(ngrxRouterFeatureKey);

// // Field selectors
// const getState = createSelector(getRouterState, (router: State) =>
//   router ? router.state : ({} as RouterStateUrl)
// );

// const getUrl = createSelector(getRouterState, (router: State) =>
//   router ? router.state.url : ''
// );

// const getQueryParams = createSelector(getRouterState, (router: State) =>
//   router ? router.state.queryParams : {}
// );

// const getParams = createSelector(getRouterState, (router: State) =>
//   router ? router.state.params : ''
// );

// export const routerQuery = {
//   getState,
//   getUrl,
//   getQueryParams,
//   getParams,
// };
