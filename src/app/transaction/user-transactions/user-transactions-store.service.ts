import { Injectable } from '@angular/core';
import { select, setProp } from '@ngneat/elf';
import { selectAllEntities, setEntities } from '@ngneat/elf-entities';
import { combineLatest, map, Observable } from 'rxjs';
import { uniqBy } from 'st-utils';

import { UserTransactionsStore } from './user-transactions.store';

import { IdName } from '@model/id-name';
import { IdNameChecked } from '@model/id-name-checked';
import { TransactionCard } from '@model/transaction-card';

@Injectable({ providedIn: 'root' })
export class UserTransactionsStoreService {
  constructor(private readonly store: UserTransactionsStore) {}

  readonly showSettled$ = this.store.pipe(select(state => state.showSettled));

  readonly transactionsFiltered$ = combineLatest([
    this.store.pipe(select(state => state.peopleSelected)),
    this.showSettled$,
    this.store.pipe(selectAllEntities()),
  ]).pipe(
    map(([peopleSelected, showSettled, transactions]) => {
      const peopleSet = new Set(peopleSelected);
      if (!showSettled) {
        transactions = transactions.filter(transaction => transaction.total !== transaction.totalReceived);
      }
      if (peopleSet.size) {
        transactions = transactions.filter(transaction => peopleSet.has(transaction.idPerson));
      }
      return transactions;
    })
  );

  readonly people$: Observable<IdNameChecked[]> = combineLatest([
    this.store.pipe(selectAllEntities()),
    this.store.pipe(select(state => state.peopleSelected)),
  ]).pipe(
    map(([transactions, peopleSelected]) =>
      uniqBy(
        transactions.reduce(
          (people, transaction) => [...people, { name: transaction.personName, id: transaction.idPerson }],
          [] as IdName[]
        ),
        'id'
      ).map(person => ({ ...person, checked: peopleSelected.has(person.id) }))
    )
  );

  setTransactions(transactions: TransactionCard[]): void {
    this.store.update(setEntities(transactions));
  }

  setShowSettled(showSettled: boolean): void {
    this.store.update(setProp('showSettled', showSettled));
  }

  togglePerson(id: string): void {
    this.store.update(
      setProp('peopleSelected', peopleSelected => {
        const newPeopleSelected = new Set([...peopleSelected]);
        if (newPeopleSelected.has(id)) {
          newPeopleSelected.delete(id);
        } else {
          newPeopleSelected.add(id);
        }
        return newPeopleSelected;
      })
    );
  }

  clearPeopleSelected(): void {
    this.store.update(setProp('peopleSelected', new Set()));
  }

  setIdUser(idUser: string): void {
    this.store.update(setProp('idUser', idUser));
  }

  getIdUser(): string | null {
    return this.store.query(state => state.idUser);
  }

  reset(): void {
    this.store.reset();
  }
}
