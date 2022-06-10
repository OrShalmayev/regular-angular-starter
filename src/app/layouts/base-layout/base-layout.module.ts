import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../pages').then(m => m.PagesModule),
    },
];
@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class BaseLayoutModule {}
