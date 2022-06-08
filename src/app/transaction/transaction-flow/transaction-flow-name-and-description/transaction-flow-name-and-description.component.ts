import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TransactionFlowPort } from '../transaction-flow.port';

import { TransactionCreateDto } from '@model/transaction-create.dto';
import { BaseComponent } from '@shared/components/base-component';
import { includeKeys } from '@shared/utils/include-keys';

interface Form {
  name: FormControl<string>;
  description: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-transaction-flow-name-and-description',
  templateUrl: './transaction-flow-name-and-description.component.html',
  styleUrls: ['./transaction-flow-name-and-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFlowNameAndDescriptionComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly transactionFlowPort: TransactionFlowPort,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  readonly form = this._getForm();

  readonly transactionCreateDto = TransactionCreateDto;

  private _getForm(): FormGroup<Form> {
    return this.formBuilder.group<Form>({
      name: this.formBuilder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(TransactionCreateDto.nameMinLength),
          Validators.maxLength(TransactionCreateDto.nameMaxLength),
        ],
      }),
      description: this.formBuilder.control<string | null | undefined>(null, {
        validators: [Validators.maxLength(TransactionCreateDto.descriptionMaxLength)],
      }),
    });
  }

  onEnter(): void {
    if (this.form.invalid) {
      return;
    }
    this.router.navigate(['../', 'person'], { relativeTo: this.activatedRoute });
  }

  ngOnInit(): void {
    this.transactionFlowPort
      .selectDto()
      .pipe(this.untilDestroy(), includeKeys(['name', 'description']))
      .subscribe(values => {
        this.form.patchValue(values);
      });
  }

  save(): void {
    this.transactionFlowPort.setNameAndDescription(this.form.getRawValue());
  }
}
