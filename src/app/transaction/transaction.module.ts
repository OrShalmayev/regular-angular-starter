import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';

import { GoBackButtonComponent } from '@shared/components/go-back-button/go-back-button.component';
import { UtilityDirective } from '@shared/components/utilities/utility.directive';
import { DateBrPipe } from '@shared/pipes/date-br-pipe/date-br.pipe';

@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    GoBackButtonComponent,
    MatExpansionModule,
    MatListModule,
    DateBrPipe,
    MatButtonModule,
    MatIconModule,
    UtilityDirective,
    MatDialogModule,
    MatTooltipModule,
  ],
})
export class TransactionModule {}
