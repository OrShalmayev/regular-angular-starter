import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trackByFactory } from '@stlmpp/utils';

import {
  TransactionItemDay,
  TransactionItemMonth,
  TransactionItemYear,
  TransactionStoreService,
} from './transaction-store.service';
import { TransactionService } from './transaction.service';

import { RouteParamEnum } from '@model/route-param.enum';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/confirm-dialog.service';
import { trackById } from '@shared/utils/track-by';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {
  constructor(
    private readonly transactionStoreService: TransactionStoreService,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly transactionService: TransactionService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  readonly transaction$ = this.transactionStoreService.transaction$;

  readonly trackByMonth = trackById<TransactionItemMonth>();
  readonly trackByYear = trackByFactory<TransactionItemYear>('year');
  readonly trackByItem = trackById<TransactionItemDay>();

  onAfterExpand(id: string): void {
    this.transactionStoreService.setOpened(id);
  }

  async onDelete(): Promise<void> {
    const transaction = this.transactionStoreService.get();
    const idUser = this.activatedRoute.snapshot.paramMap.get(RouteParamEnum.idUser)!;
    const dialogRef = await this.confirmDialogService.confirm({
      title: 'Delete transaction',
      content: `All transaction items will be deleted. This action can't be undone`,
      buttons: [
        'Close',
        { title: 'Delete', action: () => this.transactionService.delete(idUser, transaction.idTransaction) },
      ],
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      }
    });
  }
}
