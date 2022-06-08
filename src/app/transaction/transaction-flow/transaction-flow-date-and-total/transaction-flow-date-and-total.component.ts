import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMaskConfig } from 'ngx-currency/src/currency-mask.config';

import { TransactionFlowPort } from '../transaction-flow.port';

import { TransactionCreateDto } from '@model/transaction-create.dto';
import { BaseComponent } from '@shared/components/base-component';
import { includeKeys } from '@shared/utils/include-keys';

interface Form {
  date: FormControl<Date>;
  total: FormControl<number>;
}

@Component({
  selector: 'app-transaction-flow-new-date-and-total',
  templateUrl: './transaction-flow-date-and-total.component.html',
  styleUrls: ['./transaction-flow-date-and-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFlowDateAndTotalComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly transactionFlowPort: TransactionFlowPort,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  readonly form = this._getForm();

  readonly currencyMaskOptions: Partial<CurrencyMaskConfig> = {
    allowNegative: false,
    max: TransactionCreateDto.totalMax,
  };

  private _getForm(): FormGroup<Form> {
    return this.formBuilder.group({
      date: this.formBuilder.control(new Date(), { validators: [Validators.required] }),
      total: this.formBuilder.control(0, {
        validators: [
          Validators.required,
          Validators.min(TransactionCreateDto.totalMin),
          Validators.max(TransactionCreateDto.totalMax),
        ],
      }),
    });
  }

  onEnter(): void {
    if (this.form.invalid) {
      return;
    }
    this.router.navigate(['../', 'summary'], { relativeTo: this.activatedRoute });
  }

  ngOnInit(): void {
    this.transactionFlowPort
      .selectDto()
      .pipe(this.untilDestroy(), includeKeys(['date', 'total']))
      .subscribe(values => {
        this.form.patchValue(values);
      });
  }

  save(): void {
    this.transactionFlowPort.setDateAndTotal(this.form.getRawValue());
  }
}
