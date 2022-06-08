import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionStoreService } from '../transaction-store.service';

import { TransactionFlowEditAdapter } from './transaction-flow-edit.adapter';

import { TransactionType } from '@model/transaction-type';

@Injectable({ providedIn: 'root' })
export class TransactionEditResolver implements Resolve<void> {
  constructor(
    private readonly transactionStoreService: TransactionStoreService,
    private readonly transactionFlowEditAdapter: TransactionFlowEditAdapter
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    const { name, personName, idPerson, description, total, date, idTransaction } = this.transactionStoreService.get();
    this.transactionFlowEditAdapter.setInitial(idTransaction, {
      total,
      name,
      personName,
      date,
      idPerson,
      description,
      type: TransactionType.Loan,
    });
  }
}
