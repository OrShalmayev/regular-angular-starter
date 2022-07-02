import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'shared-field-error',
    templateUrl: './field-error.component.html',
    styleUrls: ['./field-error.component.scss'],
    standalone: true,
    imports: [CommonModule, MatFormFieldModule],
})
export class FieldErrorComponent {
    constructor() {}

    errorMsgList: any = [];
    private _default: 'default' = 'default';

    @Input('controlName')
    controlName!: AbstractControl | AbstractControlDirective;
    @Input('HTMLType') HTMLType: 'REGULAR' | 'MATERIAL' = 'REGULAR';

    errorMessage: any = {
        [this._default]: (params: any) => `Invalid format`,
        required: (params: any) => `Field is required`,
        maxlength: (params: any) => `Maximum length of ${params.requiredLength} is required.`,
        minlength: (params: any) => `Minimum length of ${params.requiredLength} is required`,
        pattern: (params: any) => `Invalid format`,
        email: (params: any) => `Email is not valid`,
    };

    listErrors() {
        if (!this.controlName) return [];
        if (this.controlName.errors) {
            this.errorMsgList = [];
            Object.keys(this.controlName.errors).map(error => {
                if (!Object.keys(this.errorMessage).includes(error)) {
                    console.warn(
                        `${error} didnt found at error component errorMessage object.\n setting error to default.`
                    );
                    error = this._default;
                }
                this.controlName.touched || this.controlName.dirty
                    ? //@ts-ignore
                      this.errorMsgList.push(this.errorMessage[error](this.controlName.errors[error]))
                    : '';
            });
            return this.errorMsgList;
        } else {
            return [];
        }
    }
}
