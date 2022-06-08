import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isNotNil } from 'st-utils';

import { UserTransactionsStoreService } from './user-transactions-store.service';

import { RouteParamEnum } from '@model/route-param.enum';

@Injectable({ providedIn: 'root' })
export class UserTransactionsResetStoreGuard implements CanActivate {
  constructor(private readonly userTransactionsStoreService: UserTransactionsStoreService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idUserParam = route.paramMap.get(RouteParamEnum.idUser)!;
    const idUser = this.userTransactionsStoreService.getIdUser();
    if (idUser !== idUserParam) {
      if (isNotNil(idUser)) {
        this.userTransactionsStoreService.reset();
      }
      this.userTransactionsStoreService.setIdUser(idUserParam);
    }
    return true;
  }
}
