import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TransactionFlowPort } from '../transaction-flow/transaction-flow.port';

import { TransactionEditRoutingModule } from './transaction-edit-routing.module';
import { TransactionFlowEditAdapter } from './transaction-flow-edit.adapter';

@NgModule({
  declarations: [],
  imports: [CommonModule, TransactionEditRoutingModule],
  providers: [
    {
      provide: TransactionFlowPort,
      useExisting: TransactionFlowEditAdapter,
    },
  ],
})
export class TransactionEditModule {}
