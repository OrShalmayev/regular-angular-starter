import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseComponent } from '../base-component';

import { UtilitiesService } from './utilities.service';
import { Utility } from './utility';

@Directive({
  selector: '[appUtility]',
  host: { class: 'utility' },
  standalone: true,
})
export class UtilityDirective extends BaseComponent implements OnDestroy, OnInit {
  constructor(
    private readonly utilitiesService: UtilitiesService,
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    super();
    const [id, utility$] = this.utilitiesService.add();
    this._id = id;
    this._utility$ = utility$;
  }

  private readonly _id: number;
  private readonly _utility$: Observable<Utility>;

  ngOnInit(): void {
    this._utility$.pipe(this.untilDestroy()).subscribe(utility => {
      const entries = Object.entries(utility.style);
      for (const [key, value] of entries) {
        this.renderer2.setStyle(this.elementRef.nativeElement, key, value);
      }
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.utilitiesService.remove(this._id);
  }
}
