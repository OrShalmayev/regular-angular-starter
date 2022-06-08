import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

@NgModule()
export class StoreModule {
  static forRoot(providers: Provider[]): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers,
    };
  }
}
