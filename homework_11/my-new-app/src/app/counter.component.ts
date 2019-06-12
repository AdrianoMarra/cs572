import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <button (click)="increment()"> + </button>
      <span> {{counterValue}} </span>
      <button (click)="decrement()"> - </button>
    </div>`,
  styles: []
})
export class CounterComponent implements OnInit, OnChanges {

  @Input() counter: number;
  @Output() counterChange = new EventEmitter<number>();
  counterValue: number;

  ngOnInit() {
    if (!this.counterValue) {
      this.counterValue = 0;
    }
  }

  ngOnChanges(changes: any): void {
    this.counterValue = changes.counter.currentValue;
    this.counterChange.emit(this.counterValue);
  }

  increment(): boolean {
    this.counterValue += 1;
    this.counterChange.emit(this.counterValue);
    return false;
  }

  decrement(): boolean {
    this.counterValue -= 1;
    this.counterChange.emit(this.counterValue);
    return false;
  }
}
