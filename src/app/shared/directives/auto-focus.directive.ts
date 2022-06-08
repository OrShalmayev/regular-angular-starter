import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[appAutoFocus],textarea[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
