import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { TransactionStoreService } from './transaction-store.service';
import { TransactionService } from './transaction.service';

import { RouteParamEnum } from '@model/route-param.enum';
import { TransactionWithItems } from '@model/transaction-with-items';

@Injectable({ providedIn: 'root' })
export class TransactionWithItemsResolver implements Resolve<TransactionWithItems> {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionStoreService: TransactionStoreService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TransactionWithItems> | Promise<TransactionWithItems> | TransactionWithItems {
    const idUser = route.paramMap.get(RouteParamEnum.idUser)!;
    const idTransaction = route.paramMap.get(RouteParamEnum.idTransaction)!;
    return this.transactionService.getWithItems(idUser, idTransaction).pipe(
      tap(transaction => {
        this.transactionStoreService.set(transaction);
      })
    );
  }
}
