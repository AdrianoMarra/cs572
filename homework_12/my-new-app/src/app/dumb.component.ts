import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dumb',
    template: `
    <div *ngFor="let item of myData, let num = index"> {{ num }} - {{ item }} </div>
    <span>{{ myString | triplePipe:3 }}</span>
    `,
    styles: ['div { border: 2px solid blue; }', 'span {color: red}']
})
export class AppDumbComponent {
    @Input() myData = [];
    private myString = 'Testing';
}