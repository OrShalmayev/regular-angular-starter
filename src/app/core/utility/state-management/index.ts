import { ActionCreator, createAction } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
/**
 * Enums
 */
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
export type TCallState = ELoadingState | IErrorState;

/**
 * Utils
 */
// reference: https://indepth.dev/posts/1451/ngrx-best-practices-new
export function createHTTPActions<RequestPayload = void, ResponsePayload = void, ErrorPayload = void>(
    actionType: string
): [
    ActionCreator<
        string,
        (props?: RequestPayload) => {
            payload: RequestPayload;
        } & TypedAction<string>
    >,
    ActionCreator<
        string,
        (props?: ResponsePayload) => {
            payload: ResponsePayload;
        } & TypedAction<string>
    >,
    ActionCreator<
        string,
        (props?: ErrorPayload) => {
            payload: ErrorPayload;
        } & TypedAction<string>
    >
] {
    return [
        //@ts-ignore
        createAction(actionType, (payload: RequestPayload) => ({ payload })),
        //@ts-ignore
        createAction(`${actionType} Success`, (payload?: ResponsePayload) => ({ payload })),
        //@ts-ignore
        createAction(`${actionType} Error`, (payload: ErrorPayload) => ({ payload })),
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
