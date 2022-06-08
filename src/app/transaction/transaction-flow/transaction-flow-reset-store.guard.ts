import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isNotNil } from 'st-utils';

import { TransactionFlowPort } from './transaction-flow.port';

import { RouteParamEnum } from '@model/route-param.enum';

@Injectable()
export class TransactionFlowResetStoreGuard implements CanActivate {
  constructor(private readonly transactionFlowPort: TransactionFlowPort) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idUserParam = route.paramMap.get(RouteParamEnum.idUser)!;
    const idUser = this.transactionFlowPort.getIdUser();
    if (idUser !== idUserParam) {
      if (isNotNil(idUser)) {
        this.transactionFlowPort.reset();
      }
      this.transactionFlowPort.setIdUser(idUserParam);
    }
    return true;
  }
}
