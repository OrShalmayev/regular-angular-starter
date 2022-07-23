import { BehaviorSubject, Observable } from 'rxjs';

export function convertObservableToBehaviorSubject<T = any>(source: Observable<T>): BehaviorSubject<T> {
  const mappedSubject = new BehaviorSubject<T>([] as any);
  source.subscribe(value => mappedSubject.next(value));
  return mappedSubject;
}
