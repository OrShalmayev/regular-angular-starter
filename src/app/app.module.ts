import { registerLocaleData, TitleCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEN from '@angular/common/locales/en';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { DateInterceptor } from './core/interceptors/date.interceptor';
import { WINDOW, WINDOW_PROVIDERS } from './core/services/window.service';
import { LocaleMonthsProvider } from './core/tokens/locale-months.token';
import { NAVIGATOR } from './core/tokens/navigator.token';
import { GoBackButtonStoreProviders } from './shared/components/go-back-button/go-back-button.store';
import { UtilitiesStoreProviders } from './shared/components/utilities/utilities.store';
import { StoreModule } from './shared/store/store.module';

import { AnyObject } from '@shared/utils/type';

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
        MatDateFnsModule,
        StoreModule.forRoot([GoBackButtonStoreProviders, UtilitiesStoreProviders]),
    ],
    providers: [
        ...WINDOW_PROVIDERS,
        {
            provide: NAVIGATOR,
            useFactory: (window: Window | AnyObject) => window.navigator ?? {},
            deps: [WINDOW],
        },
        { provide: HTTP_INTERCEPTORS, useExisting: ApiInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useExisting: DateInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } as MatFormFieldDefaultOptions },
        { provide: MAT_DATE_LOCALE, useValue: dateFnsLocaleEN },
        { provide: CURRENCY_MASK_CONFIG, useFactory: currencyMaskConfigFactory },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } as MatSnackBarConfig },
        { provide: TitleCasePipe, useClass: TitleCasePipe },
        LocaleMonthsProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
