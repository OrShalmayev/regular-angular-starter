import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionEditResolver } from './transaction-edit.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../transaction-flow/transaction-flow.module').then(m => m.TransactionFlowModule),
    resolve: [TransactionEditResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionEditRoutingModule {}
