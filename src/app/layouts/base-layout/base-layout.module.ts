import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseLayoutComponent} from "./base-layout.component";

import { NavbarComponent } from '@shared/components/navbar/navbar.component';

const ROUTES: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../pages').then(m => m.PagesModule),
            }
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(ROUTES), NavbarComponent],
})
export class BaseLayoutModule {
}
