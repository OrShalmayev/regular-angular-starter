import { InjectionToken } from "@angular/core";
import { ELoaderTypes } from "@shared/directives/loading.directive";

export const loaderTypesToken = new InjectionToken<typeof ELoaderTypes>('loader types', {
    providedIn: 'root',
    factory: () => (ELoaderTypes),
})