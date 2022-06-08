import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { select, setProp } from '@ngneat/elf';
import { Observable } from 'rxjs';

import { TransactionFlowMessages, TransactionFlowPort } from '../transaction-flow/transaction-flow.port';
import { TransactionService } from '../transaction.service';

import { TransactionAddStore } from './transaction-add.store';

import { TransactionCard } from '@model/transaction-card';
import { TransactionCreateDto } from '@model/transaction-create.dto';

@Injectable({ providedIn: 'root' })
export class TransactionFlowAddAdapter extends TransactionFlowPort {
  constructor(
    private readonly transactionAddStore: TransactionAddStore,
    private readonly transactionService: TransactionService,
    @Inject(LOCALE_ID) locale: string
  ) {
    super(locale);
  }

  readonly messages: TransactionFlowMessages = {
    title: 'Add new transaction',
    saveError: 'Could not create transaction, please try again later',
    saveSuccessful: 'New transaction added successfully!',
    summarySaveButton: 'Create transaction',
    summaryTitle: 'Summary of the new transaction',
    nameAndDescriptionPageTitle: 'New transaction - Name and description',
    personPageTitle: 'New transaction - Person',
    dateAndTotalPageTitle: 'New transaction - Date and total',
    summaryPageTitle: 'New transactions - Summary',
    backButtonTooltip: 'Back to transactions',
  };

  private _updateDto(dto: Partial<TransactionCreateDto>): void {
    this.transactionAddStore.update(setProp('dto', oldDto => ({ ...oldDto, ...dto })));
  }

  getDto(): TransactionCreateDto {
    return this.transactionAddStore.query(state => state.dto);
  }

  getIdUser(): string | null {
    return this.transactionAddStore.query(state => state.idUser);
  }

  reset(): void {
    this.transactionAddStore.reset();
  }

  save(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard> {
    return this.transactionService.create(idUser, dto);
  }

  setDateAndTotal(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this._updateDto(dto);
  }

  setIdUser(idUser: string): void {
    this.transactionAddStore.update(setProp('idUser', idUser));
  }

  setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this._updateDto(dto);
  }

  setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this._updateDto(dto);
  }

  override getMiddlePath(): string[] {
    return ['new'];
  }

  override selectDto(): Observable<TransactionCreateDto> {
    return this.transactionAddStore.pipe(select(state => state.dto));
  }
}
