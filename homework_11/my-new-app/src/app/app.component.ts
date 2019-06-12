import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-counter [counter]="componentCounterValue" (counterChange)="updateCounter1($event)">
    </app-counter>
    <div> Component Counter Value {{componentCounterValue01}} </div>

    <br>

    <app-counter [counter]="componentCounterValue" (counterChange)="updateCounter2($event)">
    </app-counter>
    <div> Component Counter Value {{componentCounterValue02}} </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  /**
   * componentCounterValue is optional and its default value is 0.
   * Therefore, it may be commented and
   * [counter]="componentCounterValue" removed from the component
   */

  componentCounterValue = 10;
  componentCounterValue01: number;
  componentCounterValue02: number;

  ngOnInit() {
  }

  updateCounter1(val: number) {
    this.componentCounterValue01 = val;
    if (!this.componentCounterValue01) {
      this.componentCounterValue01 = 0;
    }
  }

  updateCounter2(val: number) {
    this.componentCounterValue02 = val;
    if (!this.componentCounterValue02) {
      this.componentCounterValue02 = 0;
    }
  }

}
