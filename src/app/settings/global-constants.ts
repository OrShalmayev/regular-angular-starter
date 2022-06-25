import { Injectable, InjectionToken, Provider } from '@angular/core';
export interface IGlobalConstants {
    readonly APP_NAME: string;
    readonly APP_VERSION: string;
    readonly APP_DESCRIPTION: string;
    readonly APP_AUTHOR: string;
    readonly APP_AUTHOR_URL: string;
}
class GlobalConstants implements IGlobalConstants {
    readonly APP_NAME: string = 'Angular-App';
    readonly APP_VERSION: string = '1.0.0';
    readonly APP_DESCRIPTION: string = 'Angular App';
    readonly APP_AUTHOR: string = 'Or Shalmayev';
    readonly APP_AUTHOR_URL: string = '';
}
export const GlobalConstantsToken = new InjectionToken<IGlobalConstants>('Global Constants');
export const GlobalConstantsProvider: Provider = {
    provide: GlobalConstantsToken,
    useClass: GlobalConstants,
};
