import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { PageTitleStrategy } from './page-title-strategy';
import { HomeModule } from './pages/home/home.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            paramsInheritanceStrategy: 'always',
        }),
    ],
    exports: [RouterModule],
    providers: [{ provide: TitleStrategy, useClass: PageTitleStrategy }],
})
export class AppRoutingModule {}
