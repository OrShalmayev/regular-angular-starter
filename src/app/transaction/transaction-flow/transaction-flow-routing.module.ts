import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionFlowDateAndTotalTitleResolver } from './transaction-flow-date-and-total-title.resolver';
import { TransactionFlowDateAndTotalGuard } from './transaction-flow-date-and-total.guard';
import { TransactionFlowDateAndTotalComponent } from './transaction-flow-date-and-total/transaction-flow-date-and-total.component';
import { TransactionFlowNameAndDescriptionTitleResolver } from './transaction-flow-name-and-description-title.resolver';
import { TransactionFlowNameAndDescriptionGuard } from './transaction-flow-name-and-description.guard';
import { TransactionFlowNameAndDescriptionComponent } from './transaction-flow-name-and-description/transaction-flow-name-and-description.component';
import { TransactionFlowPersonTitleResolver } from './transaction-flow-person-title.resolver';
import { TransactionFlowPersonGuard } from './transaction-flow-person.guard';
import { TransactionFlowPersonComponent } from './transaction-flow-person/transaction-flow-person.component';
import { TransactionFlowResetStoreGuard } from './transaction-flow-reset-store.guard';
import { TransactionFlowSummaryTitleResolver } from './transaction-flow-summary-title.resolver';
import { TransactionFlowSummaryComponent } from './transaction-flow-summary/transaction-flow-summary.component';
import { TransactionFlowComponent } from './transaction-flow.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionFlowComponent,
    canActivate: [TransactionFlowResetStoreGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'name-and-description',
      },
      {
        path: 'name-and-description',
        component: TransactionFlowNameAndDescriptionComponent,
        title: TransactionFlowNameAndDescriptionTitleResolver,
      },
      {
        path: 'person',
        component: TransactionFlowPersonComponent,
        canActivate: [TransactionFlowNameAndDescriptionGuard],
        title: TransactionFlowPersonTitleResolver,
      },
      {
        path: 'date-and-total',
        component: TransactionFlowDateAndTotalComponent,
        canActivate: [TransactionFlowPersonGuard],
        title: TransactionFlowDateAndTotalTitleResolver,
      },
      {
        path: 'summary',
        component: TransactionFlowSummaryComponent,
        canActivate: [TransactionFlowDateAndTotalGuard],
        title: TransactionFlowSummaryTitleResolver,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionFlowRoutingModule {}
