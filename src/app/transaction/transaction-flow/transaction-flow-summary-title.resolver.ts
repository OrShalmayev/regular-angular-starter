import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionFlowPort } from './transaction-flow.port';

@Injectable()
export class TransactionFlowSummaryTitleResolver implements Resolve<string> {
  constructor(private readonly transactionFlowPort: TransactionFlowPort) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    return this.transactionFlowPort.messages.summaryPageTitle;
  }
}
