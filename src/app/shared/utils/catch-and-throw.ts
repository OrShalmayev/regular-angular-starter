import { catchError, isObservable, Observable, OperatorFunction, throwError } from 'rxjs';

export const catchAndThrow = <T>(callback: (error: unknown) => unknown): OperatorFunction<T, T> =>
  catchError((err: unknown) => {
    const toReturn = callback(err);
    if (isObservable(toReturn)) {
      return toReturn as Observable<never>;
    } else {
      return throwError(() => err);
    }
  });
