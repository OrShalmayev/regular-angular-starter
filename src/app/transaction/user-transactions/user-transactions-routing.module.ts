import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionCardsResolver } from '../transaction-cards.resolver';

import { UserTransactionsTitleResolver } from './user-transactions-title.resolver';
import { UserTransactionsComponent } from './user-transactions.component';

import { RouteDataEnum } from '@model/route-data.enum';
import { RouteParamEnum } from '@model/route-param.enum';

const routes: Routes = [
  {
    path: '',
    component: UserTransactionsComponent,
    resolve: {
      [RouteDataEnum.transactionCards]: TransactionCardsResolver,
    },
    title: UserTransactionsTitleResolver,
  },
  {
    path: 'new',
    loadChildren: () => import('../transaction-add/transaction-add.module').then(m => m.TransactionAddModule),
  },
  {
    path: `:${RouteParamEnum.idTransaction}`,
    loadChildren: () => import('../transaction.module').then(m => m.TransactionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionsRoutingModule {}
