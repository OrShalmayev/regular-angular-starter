import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

import { TransactionWithItems } from '@model/transaction-with-items';
import { createStoreProviders } from '@shared/store/create-store-providers';
import { LocalStorageStateStorage } from '@shared/store/local-storage-state-storage';

export interface TransactionWithItemsState extends TransactionWithItems {
  opened?: string | null;
}

const store = createStore(
  { name: 'transaction' },
  withProps<TransactionWithItemsState>({
    name: '',
    date: new Date(),
    description: '',
    idPerson: '',
    idTransaction: '',
    personName: '',
    total: 0,
    items: [],
  })
);

LocalStorageStateStorage.persistStore(store, {
  includeKeys: ['opened'],
});

const [TransactionStoreProviders, BaseClass, useFactory] = createStoreProviders(store, {
  includeKeys: ['opened'],
});

@Injectable()
export class TransactionStore extends BaseClass {}

TransactionStoreProviders.push({ provide: TransactionStore, useFactory });

export { TransactionStoreProviders };
