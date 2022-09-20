// import {Action, createReducer, on} from "@ngrx/store";
// import {IHolidaysState} from "@state/holidays/holidays.model";
// import {ELoadingState} from "@models/state-management";
// import {holidaysActions} from "@state/holidays/holidays.actions";

// const initialState: IHolidaysState = {
//     callState: ELoadingState.INIT, holidays: []
// };
// const reducer = createReducer(
//     initialState,
//     on(holidaysActions.loadHolidays, (state) => ({
//         ...state,
//         callState: ELoadingState.LOADING
//     })),
//     on(holidaysActions.loadHolidaysSuccess, (state, {holidays}) => ({
//         ...state,
//         callState: ELoadingState.LOADED,
//         holidays,
//     })),
//     on(holidaysActions.loadHolidaysFailure, (state, {errorMsg}) => ({
//         ...state,
//         callState: {errorMsg},
//     })),
// );

// export function holidaysReducer(state: IHolidaysState, action: Action): IHolidaysState {
//     return reducer(state, action);
// }