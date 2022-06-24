import { FormStyle, getLocaleMonthNames, TitleCasePipe, TranslationWidth } from '@angular/common';
import { InjectionToken, LOCALE_ID, Provider } from '@angular/core';

export const LocaleMonthsToken = new InjectionToken<string[]>('Locale months');
export const LocaleMonthsProvider: Provider = {
  provide: LocaleMonthsToken,
  useFactory: (locale: string, titleCasePipe: TitleCasePipe) =>
    getLocaleMonthNames(locale, FormStyle.Format, TranslationWidth.Short).map(month => titleCasePipe.transform(month)),
  deps: [LOCALE_ID, TitleCasePipe],
};
