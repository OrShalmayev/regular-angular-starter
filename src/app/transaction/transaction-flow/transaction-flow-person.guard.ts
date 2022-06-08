import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionFlowPort } from './transaction-flow.port';

import { RouteParamEnum } from '@model/route-param.enum';

@Injectable()
export class TransactionFlowPersonGuard implements CanActivate {
  constructor(private readonly transactionFlowPort: TransactionFlowPort, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idUser = route.paramMap.get(RouteParamEnum.idUser)!;
    return (
      this.transactionFlowPort.isPersonValid() ||
      this.router.createUrlTree([
        '/users',
        idUser,
        'transactions',
        ...this.transactionFlowPort.getMiddlePath(route),
        'person',
      ])
    );
  }
}
