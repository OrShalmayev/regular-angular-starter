import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxCurrencyModule } from 'ngx-currency';

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
import { TransactionFlowRoutingModule } from './transaction-flow-routing.module';
import { TransactionFlowSummaryTitleResolver } from './transaction-flow-summary-title.resolver';
import { TransactionFlowSummaryComponent } from './transaction-flow-summary/transaction-flow-summary.component';
import { TransactionFlowComponent } from './transaction-flow.component';

import { GoBackButtonComponent } from '@shared/components/go-back-button/go-back-button.component';
import { UtilityDirective } from '@shared/components/utilities/utility.directive';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
import { ButtonActionsDirective } from '@shared/directives/button-actions.directive';
import { MaskDirective } from '@shared/directives/mask.directive';
import { DateBrPipe } from '@shared/pipes/date-br-pipe/date-br.pipe';

@NgModule({
  declarations: [
    TransactionFlowComponent,
    TransactionFlowNameAndDescriptionComponent,
    TransactionFlowPersonComponent,
    TransactionFlowDateAndTotalComponent,
    TransactionFlowSummaryComponent,
  ],
  imports: [
    CommonModule,
    TransactionFlowRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    GoBackButtonComponent,
    MaskDirective,
    MatButtonModule,
    ButtonActionsDirective,
    MatAutocompleteModule,
    NgxCurrencyModule,
    DateBrPipe,
    MatSnackBarModule,
    AutoFocusDirective,
    MatIconModule,
    UtilityDirective,
    MatTooltipModule,
  ],
  providers: [
    TransactionFlowResetStoreGuard,
    TransactionFlowPersonGuard,
    TransactionFlowNameAndDescriptionGuard,
    TransactionFlowDateAndTotalGuard,
    TransactionFlowNameAndDescriptionTitleResolver,
    TransactionFlowPersonTitleResolver,
    TransactionFlowDateAndTotalTitleResolver,
    TransactionFlowSummaryTitleResolver,
  ],
})
export class TransactionFlowModule {}
