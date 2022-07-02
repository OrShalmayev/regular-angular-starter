import { Injectable, InjectionToken, Provider } from '@angular/core';
export interface IGlobalConstants {
    readonly APP_NAME: string;
    readonly APP_VERSION: string;
    readonly APP_DESCRIPTION: string;
    readonly APP_AUTHOR: string;
    readonly APP_AUTHOR_URL: string;
}
export const GlobalConstantsToken = new InjectionToken<IGlobalConstants>('Global Constants', {
    factory: () => ({
        APP_NAME: 'Angular-App',
        APP_VERSION: '1.0.0',
        APP_DESCRIPTION: 'Angular App',
        APP_AUTHOR: 'Or Shalmayev',
        APP_AUTHOR_URL: '',
    }) 
});
export const GlobalConstantsProvider: Provider = {
    provide: 'root',
    useExisting: GlobalConstantsToken,
};
