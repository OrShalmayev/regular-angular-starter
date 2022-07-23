import { Provider } from "@angular/core";
import dateFnsLocaleEN from 'date-fns/locale/en-US';
import { registerLocaleData } from '@angular/common';
import localeEN from '@angular/common/locales/en';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ngx-currency';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LocaleMonthsProvider } from "@core/tokens/locale-months.token";

registerLocaleData(localeEN);

function currencyMaskConfigFactory(): CurrencyMaskConfig {
    return {
        align: 'left',
        decimal: ',',
        allowZero: true,
        nullable: false,
        precision: 2,
        thousands: '.',
        prefix: '',
        suffix: '',
        allowNegative: true,
    };
}

export const CORE_PROVIDERS:Provider[] = [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } as MatFormFieldDefaultOptions },
    { provide: MAT_DATE_LOCALE, useValue: dateFnsLocaleEN },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } as MatSnackBarConfig },
    { provide: CURRENCY_MASK_CONFIG, useFactory: currencyMaskConfigFactory },
    LocaleMonthsProvider,
] 