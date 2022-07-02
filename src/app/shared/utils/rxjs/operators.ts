import { catchError, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { forkJoin, MonoTypeOperatorFunction, Observable, OperatorFunction, throwError } from 'rxjs';
import { ConditionalKeys } from 'type-fest';
import { uniqBy } from 'lodash';

export const uniqByOperator = <T = any>(property: keyof T) => map<T[], T[]>(array => uniqBy(array, property));

// @ts-ignore
export const findArray = <T = any>(predicate: (item: T) => boolean) => map<T[], T>(array => array.find(predicate));

export const refresh = <T = any, R = any>(observable: Observable<R>): MonoTypeOperatorFunction<T> =>
  switchMap(data => observable.pipe(map(() => data)));

export const refreshMap = <T, R = any>(callback: (data: T) => Observable<R>): MonoTypeOperatorFunction<T> =>
  switchMap(data => callback(data).pipe(map(() => data)));

export const refreshAll = <T>(observables: Observable<any>[]): MonoTypeOperatorFunction<T> =>
  switchMap(data => forkJoin(observables).pipe(map(() => data)));

export const catchAndThrow = <T>(callback: (errors: any) => any): MonoTypeOperatorFunction<T> =>
  catchError(err => throwError(callback(err) ?? err));

export const distinctUntilManyKeysChanged = <T extends Record<any, any>, K extends keyof T = keyof T>(keys: K[]) =>
  distinctUntilChanged<T>((objA, objB) => keys.every(key => objA?.[key] === objB?.[key]));

export function reduceToFunc<T, K extends ConditionalKeys<T, any[]>>(array: T[], key: K): T[K] {
  if (!array?.length || !key) {
    return [] as T[K];
  }
  return array.reduce((acc, item) => [...acc, ...(item?.[key] ?? [])], [] as any);
}

export const reduceTo = <T, K extends ConditionalKeys<T, any[]>>(key: K): OperatorFunction<T[], T[K]> =>
  map((array: T[]) => {
    return reduceToFunc(array, key);
  });
