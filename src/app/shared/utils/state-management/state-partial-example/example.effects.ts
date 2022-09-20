// import {Injectable} from "@angular/core";
// import {Actions, createEffect, ofType} from "@ngrx/effects";
// import {holidaysActions} from "@state/holidays/holidays.actions";
// import {catchError, map, switchMap} from "rxjs/operators";
// import {GeneralService} from "../../../services";
// import {HttpErrorResponse} from "@angular/common/http";
// import {Store} from "@ngrx/store";
// import {IAppState} from "@state/app.reducer";
// import {EMPTY} from "rxjs";

// @Injectable({
//     providedIn: 'root'
// })
// export class HolidaysEffects {
//     loadHolidaysEffect = createEffect(() => this.actions$
//         .pipe(
//             ofType(holidaysActions.loadHolidays),
//             switchMap(_ => this.generalService.getHolidaysObs()),
//             catchError((err: HttpErrorResponse, caught$) => {
//                 console.error(err);
//                 this.store.dispatch(holidaysActions.loadHolidaysFailure({errorMsg: err.message}));
//                 return EMPTY;
//             }),
//             map(holidays => holidaysActions.loadHolidaysSuccess({holidays}))
//         )
//     );

//     constructor(
//         private actions$: Actions,
//         private generalService: GeneralService,
//         private store: Store<IAppState>,
//     ) {
//     }
// }