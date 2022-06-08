import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TransactionFlowPort } from './transaction-flow.port';

@Component({
  selector: 'app-transaction-flow',
  templateUrl: './transaction-flow.component.html',
  styleUrls: ['./transaction-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFlowComponent {
  constructor(private readonly transactionFlowPort: TransactionFlowPort) {}

  readonly messages = this.transactionFlowPort.messages;
  readonly showResetButton = this.transactionFlowPort.showResetButton;

  reset(): void {
    this.transactionFlowPort.reset();
  }
}
