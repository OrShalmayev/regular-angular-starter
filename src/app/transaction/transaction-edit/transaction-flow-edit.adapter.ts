import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { select, setProp, setProps } from '@ngneat/elf';
import { isEqual, startOfDay } from 'date-fns';
import { combineLatest, map, Observable, tap } from 'rxjs';

import {
  TransactionFlowMessages,
  TransactionFlowPort,
  TransactionFlowSummaryItem,
} from '../transaction-flow/transaction-flow.port';
import { TransactionStoreService } from '../transaction-store.service';
import { TransactionService } from '../transaction.service';

import { TransactionEditStore } from './transaction-edit.store';

import { RouteParamEnum } from '@model/route-param.enum';
import { TransactionCard } from '@model/transaction-card';
import { TransactionCreateDto } from '@model/transaction-create.dto';
import { TransactionUpdateDto } from '@model/transaction-update.dto';
import { getEntries } from '@shared/utils/get-entries';

@Injectable({ providedIn: 'root' })
export class TransactionFlowEditAdapter extends TransactionFlowPort {
  constructor(
    private readonly transactionEditStore: TransactionEditStore,
    private readonly transactionService: TransactionService,
    @Inject(LOCALE_ID) locale: string,
    private readonly transactionStoreService: TransactionStoreService
  ) {
    super(locale);
  }

  readonly messages: TransactionFlowMessages = {
    title: 'Edit transaction',
    saveError: 'Could not update transaction, please try again later',
    saveSuccessful: 'Transaction updated successfully!',
    summarySaveButton: 'Edit transaction',
    summaryTitle: 'Summary of the edited transaction',
    nameAndDescriptionPageTitle: 'Edit transaction - Name and description',
    personPageTitle: 'Edit transaction - Person',
    dateAndTotalPageTitle: 'Edit transaction - Date and total',
    summaryPageTitle: 'Edit transactions - Summary',
    backButtonTooltip: 'Back to transaction',
  };
  override readonly showResetButton = true;

  private _updateDto(dto: Partial<TransactionCreateDto>): void {
    this.transactionEditStore.update(
      setProps(state => ({ ...state, dto: { ...state.dto, ...dto }, hasUpdated: true }))
    );
  }

  getDto(): TransactionCreateDto {
    return this.transactionEditStore.query(state => state.dto);
  }

  getIdUser(): string | null {
    return this.transactionEditStore.query(state => state.idUser);
  }

  reset(): void {
    this.transactionEditStore.update(setProps(state => ({ ...state, hasUpdated: false, dto: { ...state.initial } })));
  }

  save(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard> {
    const { idTransaction, initial } = this.transactionEditStore.value;
    const update: TransactionUpdateDto = getEntries({ ...dto }).reduce((acc, [key, value]) => {
      if (key === 'date') {
        if (!isEqual(startOfDay(initial[key]), startOfDay(value as Date))) {
          acc = { ...acc, [key as never]: value };
        }
      } else {
        if (initial[key] !== value) {
          acc = { ...acc, [key]: value };
        }
      }
      return acc;
    }, {} as TransactionUpdateDto);
    return this.transactionService.update(idUser, idTransaction!, update).pipe(
      tap(transaction => {
        this.transactionStoreService.update(transaction);
      })
    );
  }

  setDateAndTotal(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this._updateDto(dto);
  }

  setIdUser(idUser: string): void {
    this.transactionEditStore.update(setProp('idUser', idUser));
  }

  setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this._updateDto(dto);
  }

  setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this._updateDto(dto);
  }

  getMiddlePath(route: ActivatedRouteSnapshot): string[] {
    return [route.paramMap.get(RouteParamEnum.idTransaction)!, 'edit'];
  }

  setInitial(idTransaction: string, dto: TransactionCreateDto): void {
    this.transactionEditStore.update(
      setProps(state => {
        if (!state.hasUpdated) {
          state = { ...state, dto };
        }
        return { ...state, idTransaction, initial: dto };
      })
    );
  }

  override selectSummary(): Observable<TransactionFlowSummaryItem[]> {
    return combineLatest([this.transactionEditStore, super.selectSummary()]).pipe(
      map(([{ initial, dto }, summary]) =>
        summary.filter(item => {
          if (item.key === 'date') {
            return !isEqual(startOfDay(initial[item.key]), startOfDay(dto[item.key]));
          }
          return initial[item.key] !== dto[item.key];
        })
      )
    );
  }

  selectDto(): Observable<TransactionCreateDto> {
    return this.transactionEditStore.pipe(select(state => state.dto));
  }
}
