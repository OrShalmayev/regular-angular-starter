import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { trackByFactory } from '@stlmpp/utils';
import { finalize } from 'rxjs';

import { TransactionService } from '../../transaction.service';
import { TransactionFlowPort, TransactionFlowSummaryItem } from '../transaction-flow.port';

@Component({
  selector: 'app-transaction-flow-summary',
  templateUrl: './transaction-flow-summary.component.html',
  styleUrls: ['./transaction-flow-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFlowSummaryComponent {
  constructor(
    private readonly transactionFlowPort: TransactionFlowPort,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly transactionService: TransactionService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matSnackBar: MatSnackBar
  ) {}

  readonly summary$ = this.transactionFlowPort.selectSummary();
  readonly messages = this.transactionFlowPort.messages;
  readonly trackBySummary = trackByFactory<TransactionFlowSummaryItem>('key');

  loading = false;

  create(): void {
    this.loading = true;
    this.transactionFlowPort
      .save(this.transactionFlowPort.getIdUser()!, this.transactionFlowPort.getDto())
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.transactionFlowPort.reset();
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          this.matSnackBar.open(this.messages.saveSuccessful, 'Close');
        },
        error: () => {
          const snackbar = this.matSnackBar.open(this.messages.saveError, 'Try again');
          snackbar.onAction().subscribe(() => {
            this.create();
          });
        },
      });
  }
}
