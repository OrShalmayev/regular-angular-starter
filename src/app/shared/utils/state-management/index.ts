/**
 * Enums
 */
import {ActionCreator, createAction} from "@ngrx/store";
import {TypedAction} from "@ngrx/store/src/models";

export enum EActionTypes {
    Cached = "CACHED",
    NewData = "NEW_DATA",
}
export enum EStateUpdaterActions {
    Success = "SUCCESS",
    Loading = "LOADING",
    Error = "ERROR",
}
export const enum ELoadingState {
    INIT = 'INIT',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
}
/***
 * Interfaces
 */
export interface IErrorState {
    errorMsg: string;
}
/**
 * Types
 */
export type TActionTypes = EActionTypes;
export type TStateUpdaterActions = EStateUpdaterActions;

export type TCallState = ELoadingState | IErrorState;
/**
 * Utils
 */
// reference: https://indepth.dev/posts/1451/ngrx-best-practices-new
export function createHTTPActions<RequestPayload = void, ResponsePayload = void, ErrorPayload = void>(
    actionType: string,
): [
    ActionCreator<string, (props?: RequestPayload) => {
        payload: RequestPayload;
    } & TypedAction<string>>,
    ActionCreator<string, (props?: ResponsePayload) => {
        payload: ResponsePayload;
    } & TypedAction<string>>,
    ActionCreator<string, (props?: ErrorPayload) => {
        payload: ErrorPayload;
    } & TypedAction<string>>,
] {
    return [
        createAction(actionType, (payload: RequestPayload) => ({payload})),
        createAction(
            `${actionType} Success`,
            (payload?: ResponsePayload) => ({payload})),
        createAction(`${actionType} Error`, (payload: ErrorPayload) => ({payload})),
    ];
}
// Helper function to extract error, if there is one.
// reference: https://medium.com/angular-in-depth/ngrx-how-and-where-to-handle-loading-and-error-states-of-ajax-calls-6613a14f902d
export function getError(callState: TCallState): string | null {
    if ((callState as IErrorState).errorMsg !== undefined) {
        return (callState as IErrorState).errorMsg;
    }
    return null;
}


const isLoading = (state:{callState}):boolean => {
    const {callState} = state;

    return callState === LoadingState.Loading || callState === LoadingState.Init;
};

const isError = (state:{callState}):boolean => {
    const {callState} = state;

    return callState === LoadingState.Failed;
};

export const storeUtils = {
    isLoading,
    isError
};

