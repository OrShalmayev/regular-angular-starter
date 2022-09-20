// import {createFeatureSelector, createSelector} from "@ngrx/store";
// import {ELoadingState} from "@models/state-management";
// import {EStoreFeatureNames} from "@models/enums";
// import {IHolidaysState} from "@state/holidays/holidays.model";

// export const holidaysFeatureSelector = createFeatureSelector<IHolidaysState>(EStoreFeatureNames.holidays);

// const holidays = createSelector(
//     holidaysFeatureSelector,
//     (holidaysState: IHolidaysState) => holidaysState.holidays,
// );
// const loading = createSelector(
//     holidaysFeatureSelector,
//     (holidaysState: IHolidaysState) => holidaysState.callState === ELoadingState.LOADING,
// )

// export const holidaysSelectors = {
//     loading,
//     holidays,
// }