import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TransactionFlowPort } from '../transaction-flow/transaction-flow.port';

import { TransactionAddRoutingModule } from './transaction-add-routing.module';
import { TransactionFlowAddAdapter } from './transaction-flow-add.adapter';

@NgModule({
  declarations: [],
  imports: [CommonModule, TransactionAddRoutingModule],
  providers: [{ provide: TransactionFlowPort, useExisting: TransactionFlowAddAdapter }],
})
export class TransactionAddModule {}
