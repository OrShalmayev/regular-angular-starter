import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { finalize, map, of, switchMap, timer } from 'rxjs';

import { UserService } from '../../user/user.service';

@Injectable({ providedIn: 'root' })
export class UniqueUserIdValidatorFactory {
  constructor(private readonly userService: UserService) {}

  create(changeDetectorRef: ChangeDetectorRef, exclude?: string[]): AsyncValidatorFn {
    return control => {
      if (!control.value || control.pristine) {
        return of(null);
      }
      return timer(300).pipe(
        switchMap(() => this.userService.exists(control.value, exclude)),
        map(exists => (exists ? { uniqueUserId: true } : null)),
        finalize(() => {
          changeDetectorRef.markForCheck();
        })
      );
    };
  }
}
