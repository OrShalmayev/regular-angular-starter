import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { select, setProp, setProps } from '@ngneat/elf';
import { getMonth, getYear } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { orderBy } from 'st-utils';

import { TransactionStore, TransactionWithItemsState } from './transaction.store';

import { LocaleMonthsToken } from '@core/locale-months.token';
import { TransactionItem } from '@model/transaction-item';
import { TransactionWithItems } from '@model/transaction-with-items';

export interface TransactionItemDay extends TransactionItem {
  description: string;
}

export interface TransactionItemMonth {
  id: string;
  month: number;
  year: number;
  description: string;
  total: number;
  items: TransactionItemDay[];
}

export interface TransactionItemYear {
  year: number;
  total: number;
  months: TransactionItemMonth[];
}

export interface TransactionWithItemsGroupedByYear extends Omit<TransactionWithItemsState, 'items'> {
  years: TransactionItemYear[];
}

@Injectable({ providedIn: 'root' })
export class TransactionStoreService {
  constructor(
    private readonly store: TransactionStore,
    @Inject(LOCALE_ID) private readonly localeId: string,
    @Inject(LocaleMonthsToken) private readonly months: string[]
  ) {}

  readonly transaction$: Observable<TransactionWithItemsGroupedByYear> = this.store.pipe(
    map(({ items, ...transaction }) => {
      const yearsMap = new Map<
        number,
        Omit<TransactionItemYear, 'months'> & { months: Map<string, TransactionItemMonth> }
      >();
      for (const item of items) {
        const year = getYear(item.date);
        const itemYear = yearsMap.get(year) ?? {
          months: new Map<string, TransactionItemMonth>(),
          year,
          total: 0,
        };
        itemYear.total += item.value;
        const month = getMonth(item.date);
        const idMonth = `${transaction.idTransaction}-${year}-${month}`;
        const itemMonth: TransactionItemMonth = itemYear.months.get(idMonth) ?? {
          id: idMonth,
          month,
          year,
          total: 0,
          items: [],
          description: this.months[month],
        };
        itemMonth.items.push({ ...item, description: `Dia ${formatDate(item.date, 'dd, EEEE', this.localeId)}` });
        itemMonth.total += item.value;
        itemYear.months.set(idMonth, itemMonth);
        yearsMap.set(year, itemYear);
      }
      const years = orderBy([...yearsMap.values()], 'year', 'desc').map(year => ({
        ...year,
        months: orderBy([...year.months.values()], 'month'),
      }));
      return { ...transaction, years };
    })
  );

  readonly transactionName$ = this.store.pipe(select(state => state.name));

  set(transactionWithItems: TransactionWithItems): void {
    this.store.update(setProps(transactionWithItems));
  }

  update(partial: Partial<TransactionWithItems>): void {
    this.store.update(setProps(partial));
  }

  setOpened(id: string): void {
    this.store.update(setProp('opened', id));
  }

  get(): TransactionWithItemsState {
    return this.store.value;
  }
}
