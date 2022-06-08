import { formatCurrency } from '@angular/common';
import { ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { TransactionCard } from '@model/transaction-card';
import { TransactionCreateDto } from '@model/transaction-create.dto';
import { formatDateBr } from '@shared/pipes/date-br-pipe/date-br.pipe';

export interface TransactionFlowMessages {
  title: string;
  saveSuccessful: string;
  saveError: string;
  summaryTitle: string;
  summarySaveButton: string;
  nameAndDescriptionPageTitle: string;
  personPageTitle: string;
  dateAndTotalPageTitle: string;
  summaryPageTitle: string;
  backButtonTooltip: string;
}

export interface TransactionFlowSummaryItem {
  key: keyof TransactionCreateDto;
  value?: string | null;
  title: string;
}

export abstract class TransactionFlowPort {
  protected constructor(private readonly locale: string) {}

  abstract readonly messages: TransactionFlowMessages;
  readonly showResetButton: boolean = false;

  isNameAndDescriptionValid(): boolean {
    const { name } = this.getDto();
    return (
      !!name && name.length >= TransactionCreateDto.nameMinLength && name.length <= TransactionCreateDto.nameMaxLength
    );
  }

  isPersonValid(): boolean {
    const { personName, idPerson } = this.getDto();
    const isNameAndDescriptionValid = this.isNameAndDescriptionValid();
    return (
      (isNameAndDescriptionValid && !!idPerson) ||
      (isNameAndDescriptionValid &&
        !!personName &&
        personName.length >= TransactionCreateDto.personNameMinLength &&
        personName.length <= TransactionCreateDto.personNameMaxLength)
    );
  }

  isDateAndValueValid(): boolean {
    const { total } = this.getDto();
    return this.isPersonValid() && total >= TransactionCreateDto.totalMin && total <= TransactionCreateDto.totalMax;
  }

  selectSummary(): Observable<TransactionFlowSummaryItem[]> {
    return this.selectDto().pipe(
      map(({ name, description, personName, date, total }) => [
        { key: 'name', title: 'Name', value: name },
        { key: 'description', title: 'Description', value: description },
        { key: 'personName', title: 'Person', value: personName },
        { key: 'date', title: 'Date', value: formatDateBr(date, this.locale) },
        { key: 'total', title: 'Total', value: formatCurrency(total, this.locale, 'R$') },
      ])
    );
  }

  abstract getDto(): TransactionCreateDto;
  abstract setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void;
  abstract setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void;
  abstract setDateAndTotal(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void;
  abstract getIdUser(): string | null;
  abstract setIdUser(idUser: string): void;
  abstract save(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard>;
  abstract reset(): void;
  abstract getMiddlePath(route: ActivatedRouteSnapshot): string[];
  abstract selectDto(): Observable<TransactionCreateDto>;
}
