import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { UserService } from './user.service';

import { RouteParamEnum } from '@model/route-param.enum';

@Injectable({ providedIn: 'root' })
export class UserExistsGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idUser = route.paramMap.get(RouteParamEnum.idUser);
    let userExists$ = of(false);
    if (idUser) {
      userExists$ = this.userService.exists(idUser);
    }
    return userExists$.pipe(map(exists => exists || this.router.createUrlTree(['/'])));
  }
}
