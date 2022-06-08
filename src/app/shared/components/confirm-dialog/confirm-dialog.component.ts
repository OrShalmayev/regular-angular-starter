import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize, isObservable, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { isFunction, isString } from 'st-utils';

import { trackByIndex } from '../../utils/track-by';

import { ConfirmDialogButton, ConfirmDialogOptions } from './confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatProgressBarModule],
})
export class ConfirmDialogComponent implements OnDestroy {
  constructor(
    private readonly matDialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmDialogOptions,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.buttons = (data.buttons ?? ['Close']).map(button =>
      isString(button) ? { title: button, action: false } : button
    );
    this._disableClose = this.matDialogRef.disableClose;
  }

  private readonly _destroy$ = new Subject<void>();
  private readonly _disableClose: boolean | undefined;

  buttons: readonly ConfirmDialogButton[];

  loading = false;

  readonly trackByButton = trackByIndex<ConfirmDialogButton>();

  private _processButtonObservable(observable: Observable<unknown>): void {
    this.loading = true;
    this.matDialogRef.disableClose = true;
    this.changeDetectorRef.markForCheck();
    observable
      .pipe(
        take(1),
        takeUntil(this._destroy$),
        finalize(() => {
          this.loading = false;
          this.matDialogRef.disableClose = this._disableClose;
          this.changeDetectorRef.markForCheck();
        }),
        tap(() => {
          this.matDialogRef.close(true);
        })
      )
      .subscribe();
  }

  action(button: ConfirmDialogButton): void {
    if (!button.action) {
      this.matDialogRef.close(false);
      return;
    }
    const possibleObservable = isFunction(button.action) ? button.action(this.matDialogRef) : button.action;
    if (isObservable(possibleObservable)) {
      this._processButtonObservable(possibleObservable);
    } else if (possibleObservable === true) {
      this.matDialogRef.close(true);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
