import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackByFactory } from '@stlmpp/utils';

import { UserTransactionsStoreService } from './user-transactions-store.service';

import { IdNameChecked } from '@model/id-name-checked';
import { TransactionCard } from '@model/transaction-card';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cards-container' },
})
export class UserTransactionsComponent {
  constructor(private readonly userTransactionsStoreService: UserTransactionsStoreService) {}

  readonly showSettled$ = this.userTransactionsStoreService.showSettled$;
  readonly transactions$ = this.userTransactionsStoreService.transactionsFiltered$;
  readonly people$ = this.userTransactionsStoreService.people$;

  readonly trackByTransaction = trackByFactory<TransactionCard>('idTransaction');
  readonly trackByIdName = trackByFactory<IdNameChecked>('id');

  onShowSettledChange(checked: boolean): void {
    this.userTransactionsStoreService.setShowSettled(checked);
  }

  onPersonChange($event: MouseEvent, person: IdNameChecked): void {
    $event.stopPropagation();
    this.userTransactionsStoreService.togglePerson(person.id);
  }

  clearPersonFilter(): void {
    this.userTransactionsStoreService.clearPeopleSelected();
  }
}
