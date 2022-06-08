import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RouteParamEnum } from '@model/route-param.enum';

@Injectable({ providedIn: 'root' })
export class UserTransactionsTitleResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    return `Transactions - ${route.paramMap.get(RouteParamEnum.idUser)!}`;
  }
}
