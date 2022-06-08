import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

import { TransactionCreateDto } from '@model/transaction-create.dto';
import { TransactionType } from '@model/transaction-type';
import { createStoreProviders } from '@shared/store/create-store-providers';

export interface TransactionEditState {
  dto: TransactionCreateDto;
  idUser: string | null;
  idTransaction: string | null;
  initial: TransactionCreateDto;
  hasUpdated: boolean;
}

const store = createStore(
  { name: 'transaction-edit' },
  withProps<TransactionEditState>({
    idUser: null,
    dto: {
      date: new Date(),
      total: 1,
      name: '',
      type: TransactionType.Loan,
    },
    initial: {
      date: new Date(),
      total: 1,
      name: '',
      type: TransactionType.Loan,
    },
    idTransaction: null,
    hasUpdated: false,
  })
);

const [TransactionEditStoreProviders, TransactionEditBaseClass, useFactory] = createStoreProviders(store, {
  specialKeys: [
    {
      type: 'date',
      get: state => state.dto.date,
      set: (state, date) => ({ ...state, dto: { ...state.dto, date } }),
    },
    {
      type: 'date',
      get: state => state.initial.date,
      set: (state, date) => ({ ...state, initial: { ...state.initial, date } }),
    },
  ],
});

@Injectable()
export class TransactionEditStore extends TransactionEditBaseClass {}

TransactionEditStoreProviders.push({ provide: TransactionEditStore, useFactory });

export { TransactionEditStoreProviders };
