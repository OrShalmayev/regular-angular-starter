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
export class FieldErrorComponent {
     @Input() control!: FormControl;

    private readonly _defaultErrorKey = 'default';

    readonly errorMessage: any = {
        [this._defaultErrorKey]: (params: any) => `Invalid format`,
        required: (params: any) => `Field is required.`,
        maxlength: (params: any) => `Maximum length of ${params.requiredLength} is required.`,
        minlength: (params: any) => `Minimum length of ${params.requiredLength} is required`,
        pattern: (params: any) => `Invalid format.`,
        accountIdsNotValid: (params: any) => 'One of the ids is invalid',
        hasWhitespace: (params: any) => 'Input has white space',
    };

    errorMessage$!: Observable<string>;

    ngOnInit(): void {
        this.errorMessage$ = this.control.statusChanges.pipe(
            map(() => {
                const lastErrorMessage = this.listErrors().pop();
                return lastErrorMessage;
            })
        );
    }

    listErrors(): string[] {
        let retVal: string[] = [];
        const hasErrors = this.control && isEmpty(this.control.errors) === false

        if (hasErrors === false) return retVal;

        const controlErrKeyArr = Object.keys(this.control.errors);

        retVal = controlErrKeyArr.reduce((errList, errorKey) => {
            const errorKeyExistsInErrorMessages = Object.keys(this.errorMessage).includes(errorKey);
            const shouldAddErrorToList = this.control.touched || this.control.dirty;
            const controlErrorObject = this.control.errors[errorKey];
            let errorMessage = this.errorMessage[errorKey]?.(controlErrorObject);
            const hasCustomMessage = controlErrorObject?.customMessage;
            const shouldShowDefaultErrorMessage = errorKeyExistsInErrorMessages === false && hasCustomMessage === false;

            if (shouldShowDefaultErrorMessage) {
                errorMessage = this.errorMessage[this._defaultErrorKey]();
            }

            if (hasCustomMessage) {
                errorMessage = hasCustomMessage;
            }

            if (shouldAddErrorToList) {
                errList.push(errorMessage);
            }

            return errList;
        }, [] as string[]).filter(Boolean);

        return retVal;
    }
}
