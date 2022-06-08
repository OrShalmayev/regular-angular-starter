import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgLetModule } from '@stlmpp/utils';

import { UserTransactionCardComponent } from './user-transaction-card/user-transaction-card.component';
import { UserTransactionsRoutingModule } from './user-transactions-routing.module';
import { UserTransactionsComponent } from './user-transactions.component';

import { CardNewComponent } from '@shared/components/card-new/card-new.component';
import { GoBackButtonComponent } from '@shared/components/go-back-button/go-back-button.component';
import { UtilityDirective } from '@shared/components/utilities/utility.directive';
import { DateBrPipe } from '@shared/pipes/date-br-pipe/date-br.pipe';

@NgModule({
  declarations: [UserTransactionsComponent, UserTransactionCardComponent],
  imports: [
    CommonModule,
    UserTransactionsRoutingModule,
    MatCardModule,
    MatRippleModule,
    CardNewComponent,
    GoBackButtonComponent,
    DateBrPipe,
    MatButtonModule,
    UtilityDirective,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    NgLetModule,
    MatPseudoCheckboxModule,
  ],
})
export class UserTransactionsModule {}
