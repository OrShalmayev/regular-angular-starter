import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { BooleanInput, coerceBooleanProperty } from 'st-utils';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
  ],
})
export class CardNewComponent {
  private _disabled = false;

  @Input() icon = 'add';
  @Input() tooltip?: string;
  @Input() routerLink?: string | unknown[];

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(loading: BooleanInput) {
    this._disabled = coerceBooleanProperty(loading);
  }

  @Output() readonly cardClick = new EventEmitter<MouseEvent>();

  onClick($event: MouseEvent): void {
    if (this._disabled) {
      return;
    }
    this.cardClick.emit($event);
  }
}
