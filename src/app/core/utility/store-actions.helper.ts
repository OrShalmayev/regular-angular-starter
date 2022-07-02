import { ActionCreator, createAction } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";

export function createHTTPActions<
    RequestPayload = void,
    ResponsePayload = void,
    ErrorPayload = void
    >(
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
        createAction(`${actionType} action`, (payload: RequestPayload) => ({
            payload,
        })),
        //@ts-ignore
        createAction(`${actionType} success`, (payload?: ResponsePayload) => ({
            payload,
        })),
        //@ts-ignore
        createAction(`${actionType} failure`, (payload: ErrorPayload) => ({
            payload,
        })),
    ];
}
