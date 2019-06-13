import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[makeitbigger]'
})
export class MakeItBiggerDirective implements OnInit {
    fontSize = 14;

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    @HostListener('dblclick') changeFontSize() {
        this.fontSize += 2;
        this.renderer.setStyle(this.element.nativeElement, 'font-size', this.fontSize + 'px');
    }

    ngOnInit(): void {
        this.renderer.setStyle(this.element.nativeElement, 'font-size', this.fontSize + 'px');
    }
}