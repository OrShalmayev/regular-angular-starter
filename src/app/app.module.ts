import { registerLocaleData, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEN from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import dateFnsLocaleEN from 'date-fns/locale/en-US';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ngx-currency';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocaleMonthsProvider } from './core/tokens/locale-months.token';


import { GlobalConstantsProvider } from './settings';
import { CoreModule } from '@core/core.module';

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

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CoreModule,
        MatDateFnsModule,
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } as MatFormFieldDefaultOptions },
        { provide: MAT_DATE_LOCALE, useValue: dateFnsLocaleEN },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } as MatSnackBarConfig },
        { provide: CURRENCY_MASK_CONFIG, useFactory: currencyMaskConfigFactory },
        LocaleMonthsProvider,
        GlobalConstantsProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
