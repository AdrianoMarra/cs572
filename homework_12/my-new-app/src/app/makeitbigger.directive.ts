import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[makeitbigger]'
})
export class MakeItBiggerDirective {
    fontSize = 14;
    element: ElementRef;
    renderer: Renderer2;

    constructor(private e: ElementRef, private r: Renderer2) {
        this.setVars(e, r);
    }

    setVars(e: ElementRef, r: Renderer2) {
        this.element = e;
        this.renderer = r;
        this.renderer.setStyle(this.element.nativeElement, 'font-size', this.fontSize + 'px');
    }

    @HostListener('dblclick') foo() {
        this.fontSize += 2;
        this.renderer.setStyle(this.element.nativeElement, 'font-size', this.fontSize + 'px');
    }
}