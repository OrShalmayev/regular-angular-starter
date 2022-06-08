import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserCardNewComponent } from './user-card-new/user-card-new.component';
import { UserCardComponent } from './user-card/user-card.component';

import { CardNewComponent } from '@shared/components/card-new/card-new.component';

@NgModule({
  declarations: [HomeComponent, UserCardComponent, UserCardNewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CardNewComponent,
  ],
})
export class HomeModule {}
