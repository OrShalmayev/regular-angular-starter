import { Directive, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  protected readonly _destroy$ = new Subject<void>();

  untilDestroy<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this._destroy$);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
