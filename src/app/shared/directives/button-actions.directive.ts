import { Directive, Host, HostListener, Input, Optional } from '@angular/core';
import { FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { BooleanInput, coerceBooleanProperty } from 'st-utils';

function markAllAsTouched(group: FormGroup | FormArray): void {
  const controls = Object.values(group.controls);
  for (const control of controls) {
    if (control instanceof FormGroup || control instanceof FormArray) {
      markAllAsTouched(control);
    } else {
      control.markAsTouched();
    }
  }
}

@Directive({
  selector: 'app-button-actions, [appButtonActions]',
  standalone: true,
  host: { class: 'button-actions' },
})
export class ButtonActionsDirective {
  constructor(@Host() @Optional() private readonly formGroupDirective?: FormGroupDirective) {}

  private _validationOnEnter = false;

  @Input()
  get validationOnEnter(): boolean {
    return this._validationOnEnter;
  }
  set validationOnEnter(validationOnHover: BooleanInput) {
    this._validationOnEnter = coerceBooleanProperty(validationOnHover);
  }

  @HostListener('mouseenter')
  onMouseenter(): void {
    if (!this._validationOnEnter || !this.formGroupDirective || this.formGroupDirective.touched) {
      // TODO check if touched is set to the entire form
      return;
    }
    markAllAsTouched(this.formGroupDirective.form);
  }
}
