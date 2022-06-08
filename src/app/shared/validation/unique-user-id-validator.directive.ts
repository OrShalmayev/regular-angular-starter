import { ChangeDetectorRef, Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { UniqueUserIdValidatorFactory } from './unique-user-id-validator-factory';

@Directive({
  selector: '[ngModel][uniqueUserId]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUserIdValidatorDirective, multi: true }],
  standalone: true,
})
export class UniqueUserIdValidatorDirective implements AsyncValidator {
  constructor(changeDetectorRef: ChangeDetectorRef, uniqueUserIdValidatorFactory: UniqueUserIdValidatorFactory) {
    this._validationFn = uniqueUserIdValidatorFactory.create(changeDetectorRef);
  }

  private readonly _validationFn: AsyncValidatorFn;

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._validationFn(control);
  }
}
