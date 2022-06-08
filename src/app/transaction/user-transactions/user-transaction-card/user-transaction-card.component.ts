import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TransactionCard } from '@model/transaction-card';

@Component({
  selector: 'app-user-transaction-card',
  templateUrl: './user-transaction-card.component.html',
  styleUrls: ['./user-transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionCardComponent {
  @Input() transaction!: TransactionCard;
}
