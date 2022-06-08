import { catchError, isObservable, Observable, OperatorFunction, throwError } from 'rxjs';

export const catchAndThrow = <T>(callback: (error: unknown) => unknown): OperatorFunction<T, T> =>
  catchError((err: unknown) => {
    const ret = callback(err);
    if (isObservable(ret)) {
      return ret as Observable<never>;
    } else {
      return throwError(() => err);
    }
  });
