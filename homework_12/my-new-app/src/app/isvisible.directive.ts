import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[isvisible]'
})
export class IsVisibleDirective {
  @Input('show') defaultIsVisible = true;

  // Bind to a style properties on the host element
  @HostBinding('style.display') isVisible;

  ngOnInit() {
    this.isVisible = 'none';
    if (this.defaultIsVisible) {
      this.isVisible = 'block';
    }
  }
}