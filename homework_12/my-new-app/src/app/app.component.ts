import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-dumb [myData]="words" isvisible [show]="true" makeitbigger></app-dumb>
    `,
    styles: ['']
})
export class AppComponent {
    private words = ['Adriano', ' Cordeiro ', 'Marra'];
}