import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { TransactionCard } from '@model/transaction-card';
import { createStoreProviders } from '@shared/store/create-store-providers';

export interface UserTransactionsState {
  showSettled: boolean;
  peopleSelected: Set<string>;
  idUser: string | null;
}

const store = createStore(
  {
    name: 'user-transactions',
  },
  withProps<UserTransactionsState>({
    showSettled: false,
    peopleSelected: new Set(),
    idUser: null,
  }),
  withEntities<TransactionCard, 'idTransaction'>({ idKey: 'idTransaction' })
);

const [UserTransactionsStoreProviders, BaseClass, useFactory] = createStoreProviders(store, {
  ignoreKeys: ['ids', 'entities'],
  specialKeys: [
    {
      key: 'peopleSelected',
      type: 'set',
    },
  ],
});

@Injectable()
export class UserTransactionsStore extends BaseClass {}

UserTransactionsStoreProviders.push({ provide: UserTransactionsStore, useFactory });

export { UserTransactionsStoreProviders };
