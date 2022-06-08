import { registerLocaleData, TitleCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import dateFnsLocalePt from 'date-fns/locale/pt-BR';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ngx-currency';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionAddStoreProviders } from './transaction/transaction-add/transaction-add.store';
import { TransactionEditStoreProviders } from './transaction/transaction-edit/transaction-edit.store';
import { TransactionStoreProviders } from './transaction/transaction.store';
import { UserTransactionsStoreProviders } from './transaction/user-transactions/user-transactions.store';

import { ApiInterceptor } from '@core/interceptor/api.interceptor';
import { DateInterceptor } from '@core/interceptor/date.interceptor';
import { LocaleMonthsProvider } from '@core/locale-months.token';
import { NAVIGATOR } from '@core/navigator.token';
import { WINDOW, WINDOW_PROVIDERS } from '@core/window.service';
import { GoBackButtonStoreProviders } from '@shared/components/go-back-button/go-back-button.store';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { UtilitiesStoreProviders } from '@shared/components/utilities/utilities.store';
import { StoreModule } from '@shared/store/store.module';

registerLocaleData(localePt);

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
    NavbarComponent,
    MatDateFnsModule,
    StoreModule.forRoot([
      TransactionEditStoreProviders,
      TransactionAddStoreProviders,
      UserTransactionsStoreProviders,
      TransactionStoreProviders,
      GoBackButtonStoreProviders,
      UtilitiesStoreProviders,
    ]),
  ],
  providers: [
    ...WINDOW_PROVIDERS,
    {
      provide: NAVIGATOR,
      useFactory: (window: Window | Record<string, unknown>) => window.navigator ?? {},
      deps: [WINDOW],
    },
    { provide: HTTP_INTERCEPTORS, useExisting: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useExisting: DateInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } as MatFormFieldDefaultOptions },
    { provide: MAT_DATE_LOCALE, useValue: dateFnsLocalePt },
    { provide: CURRENCY_MASK_CONFIG, useFactory: currencyMaskConfigFactory },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } as MatSnackBarConfig },
    { provide: TitleCasePipe, useClass: TitleCasePipe },
    LocaleMonthsProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
