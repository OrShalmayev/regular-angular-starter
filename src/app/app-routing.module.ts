import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { CustomPreloadingStrategyService } from '@core/services/custom-preloading-strategy.service';

import { PageTitleStrategy } from './page-title-strategy';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layouts').then(m => m.BaseLayoutModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            paramsInheritanceStrategy: 'always',
            preloadingStrategy: CustomPreloadingStrategyService,
            enableTracing: false,
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
    providers: [{ provide: TitleStrategy, useClass: PageTitleStrategy }],
})
export class AppRoutingModule {}
