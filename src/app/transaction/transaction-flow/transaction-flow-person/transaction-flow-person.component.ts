import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, Observable, switchMap, tap } from 'rxjs';
import { isNotNil } from 'st-utils';

import { PersonService } from '../../../person/person.service';
import { TransactionFlowPort } from '../transaction-flow.port';

import { Person } from '@model/person';
import { TransactionCreateDto } from '@model/transaction-create.dto';
import { BaseComponent } from '@shared/components/base-component';
import { includeKeys } from '@shared/utils/include-keys';
import { trackById } from '@shared/utils/track-by';

interface Form {
  personName: FormControl<string | null | undefined>;
  idPerson: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-transaction-flow-new-person',
  templateUrl: './transaction-flow-person.component.html',
  styleUrls: ['./transaction-flow-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFlowPersonComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly personService: PersonService,
    private readonly transactionFlowPort: TransactionFlowPort,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  @ViewChild(MatAutocomplete) readonly matAutocomplete!: MatAutocomplete;

  readonly form = this._getForm();

  readonly transactionCreateDto = TransactionCreateDto;

  readonly people$ = this.form.controls.personName.valueChanges.pipe(
    this.untilDestroy(),
    debounceTime(300),
    filter(isNotNil),
    filter(value => value.length >= 3),
    tap(() => {
      if (this.matAutocomplete.isOpen) {
        this.form.controls.idPerson.setValue(null);
      }
    }),
    switchMap(value => this._getPeople(value))
  );

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return !!control && control.touched && (!!form?.errors?.atLeastOneRequired || control.invalid);
    },
  };

  readonly trackByPerson = trackById<Person>();

  private _getPeople(name: string): Observable<Person[]> {
    return this.personService.searchByName(this.transactionFlowPort.getIdUser()!, name).pipe(
      tap(people => {
        if (people.length && people[0].name === name) {
          this.form.controls.idPerson.setValue(people[0].id);
        } else {
          if (!this.matAutocomplete.options.some(item => item.id === this.form.controls.idPerson.value)) {
            this.form.controls.idPerson.setValue(null);
          }
        }
      })
    );
  }

  private _getForm(): FormGroup<Form> {
    return this.formBuilder.group<Form>(
      {
        idPerson: this.formBuilder.control(null, {
          validators: [Validators.maxLength(TransactionCreateDto.idPersonMaxLength)],
        }),
        personName: this.formBuilder.control(null, {
          validators: [
            Validators.minLength(TransactionCreateDto.personNameMinLength),
            Validators.maxLength(TransactionCreateDto.personNameMaxLength),
          ],
        }),
      },
      {
        validators: [this._validator()],
      }
    );
  }

  private _validator(): ValidatorFn {
    return formGroup => {
      const { idPerson, personName } = (formGroup as FormGroup<Form>).controls;
      if (!idPerson.value && !personName.value) {
        return { atLeastOneRequired: true };
      }
      return null;
    };
  }

  onEnter(): void {
    if (this.form.invalid || this.matAutocomplete.isOpen) {
      return;
    }
    this.router.navigate(['../', 'date-and-total'], { relativeTo: this.activatedRoute });
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent): void {
    this.form.controls.idPerson.setValue($event.option.id);
  }

  ngOnInit(): void {
    this.transactionFlowPort
      .selectDto()
      .pipe(this.untilDestroy(), includeKeys(['idPerson', 'personName']))
      .subscribe(values => {
        this.form.patchValue(values);
      });
  }

  save(): void {
    this.transactionFlowPort.setPerson(this.form.getRawValue());
  }
}
