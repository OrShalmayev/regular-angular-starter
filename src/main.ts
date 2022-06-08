import { ApplicationRef, enableProdMode } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableElfProdMode } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare global {
  const ngDevMode: unknown;
}

if (environment.production) {
  enableProdMode();
  enableElfProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    if (ngDevMode) {
      const applicationRef = moduleRef.injector.get(ApplicationRef);
      const componentRef = applicationRef.components[0];
      enableDebugTools(componentRef);
      devTools({
        postTimelineUpdate: () => applicationRef.tick(),
      });
    }
  })
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
