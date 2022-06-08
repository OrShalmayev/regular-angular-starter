import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

import { TransactionCreateDto } from '@model/transaction-create.dto';
import { TransactionType } from '@model/transaction-type';
import { createStoreProviders } from '@shared/store/create-store-providers';

export interface TransactionAddState {
  dto: TransactionCreateDto;
  idUser: string | null;
}

const store = createStore(
  {
    name: 'transaction-add',
  },
  withProps<TransactionAddState>({
    dto: {
      total: 1,
      name: '',
      date: new Date(),
      type: TransactionType.Loan,
    },
    idUser: null,
  })
);

const [TransactionAddStoreProviders, BaseClass, useFactory] = createStoreProviders(store, {
  specialKeys: [
    {
      type: 'date',
      get: state => state.dto.date,
      set: (state, value) => ({ ...state, dto: { ...state.dto, date: value } }),
    },
  ],
});

@Injectable()
export class TransactionAddStore extends BaseClass {}

TransactionAddStoreProviders.push({ provide: TransactionAddStore, useFactory });

export { TransactionAddStoreProviders };
