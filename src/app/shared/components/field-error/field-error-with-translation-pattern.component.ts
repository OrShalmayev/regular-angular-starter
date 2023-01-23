import {Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';
import {isEmpty} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin, Observable, of, zip} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {debug} from '../../../common/utils/rxjs.utils';

@Component({
    selector:        'field-error',
    templateUrl:     './field-error.component.html',
    styleUrls:       ['./field-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class FieldErrorComponent implements OnInit {
    private readonly _defaultKey = 'default';

    @Input() readonly fieldControl!: AbstractControl | AbstractControlDirective;

    @Input() readonly fieldName?: string;

    private readonly errorMessages$ = this.translateService.get('shared.form.errors');

    listErrors$!: Observable<string[]>

    ngOnInit(): void {
        this.listErrors$ = this.fieldControl.valueChanges.pipe(
            switchMap(() => this.errorMessages$),
            debug('filter => errorMessages$'),
            switchMap((errorMessage) => {
                if (Boolean(this.fieldControl) === false || isEmpty(this.fieldControl.errors)) {
                    return of([]);
                }

                const errorKeys = Object.keys(this.fieldControl?.errors);

                const errors$ = errorKeys.map(error => {
                    const errorMsgIncludesError: boolean = Object.keys(errorMessage).includes(error);

                    if (Boolean(errorMsgIncludesError) === false) {
                        error = this._defaultKey;
                    }

                    const isTouched = this.fieldControl.touched;
                    const isDirty = this.fieldControl.dirty;

                    if (isTouched || isDirty) {
                        const errorToShow = errorMessage[error];
                        const interpolateParams = error === 'required' ? {name: 'testing!'} : this.fieldControl.errors[error];

                        return this.translateService.get(errorToShow, {name: 'testing!'});
                    }
                });

                return forkJoin(errors$);
            }),
            debug('map => errorMessages$')
        );
    }

    constructor(private translateService: TranslateService) {

    }


}

export {FieldErrorComponent};
