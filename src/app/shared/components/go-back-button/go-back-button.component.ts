import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilitiesService } from '../utilities/utilities.service';
import { UtilityDirective } from '../utilities/utility.directive';

import { GoBackButtonService } from './go-back-button.service';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, MatTooltipModule],
})
export class GoBackButtonComponent extends UtilityDirective implements OnDestroy {
  constructor(
    private readonly goBackButtonService: GoBackButtonService,
    utilitiesService: UtilitiesService,
    renderer2: Renderer2,
    elementRef: ElementRef
  ) {
    super(utilitiesService, renderer2, elementRef);
    const [id, show$] = this.goBackButtonService.addButton();
    this._idGoBack = id;
    this.show$ = show$;
  }

  private readonly _idGoBack: number;

  @Input() link!: string | unknown[];
  @Input() tooltip: string | null = 'Go back';

  readonly show$: Observable<boolean>;

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.goBackButtonService.removeButton(this._idGoBack);
  }
}
