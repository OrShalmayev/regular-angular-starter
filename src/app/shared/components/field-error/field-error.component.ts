import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { isEmpty } from 'lodash';
import { BaseComponent } from '../base-component';
@Component({
    selector: 'shared-field-error',
    templateUrl: './field-error.component.html',
    styleUrls: ['./field-error.component.scss'],
    standalone: true,
    imports: [CommonModule, MatFormFieldModule],
})
export class FieldErrorComponent extends BaseComponent implements OnDestroy {
    private readonly _defaultKey = 'default';
    private errorMsgList: any = [];
    @Input('fieldControl') readonly fieldControl!: AbstractControl | AbstractControlDirective;
    @Input('HTMLType') readonly HTMLType: 'REGULAR' | 'MATERIAL' = 'REGULAR';

    errorMessage: any = {
        [this._defaultKey]: (params: any) => `Invalid format`,
        required: (params: any) => `Field is required`,
        maxlength: (params: any) => `Maximum length of ${params.requiredLength} is required.`,
        minlength: (params: any) => `Minimum length of ${params.requiredLength} is required`,
        pattern: (params: any) => `Invalid format`,
        email: (params: any) => `Email is not valid`,
    };

    listErrors() {
        if (!this.fieldControl || isEmpty(this.fieldControl.errors)) return [];

        this.errorMsgList = [];

        const controlErrKeyArr = Object.keys(<any>this.fieldControl.errors);

        controlErrKeyArr.map(error => {
            const errorMsgIncludesError: boolean = Object.keys(this.errorMessage).includes(error);

            if (!errorMsgIncludesError) {
                console.warn(
                    `${error} didnt found at error component errorMessage object.\n setting error to default.`
                );
                error = this._defaultKey;
            }
            this.fieldControl.touched || this.fieldControl.dirty
                ? //@ts-ignore
                  this.errorMsgList.push(this.errorMessage[error](this.fieldControl.errors[error]))
                : '';
        });
        return this.errorMsgList;
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }
}
