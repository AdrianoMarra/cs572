import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IsVisibleDirective } from './isvisible.directive';
import { AppDumbComponent } from './dumb.component';
import { MakeItBiggerDirective } from './makeitbigger.directive';
import { TriplePipePipe } from './triple-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppDumbComponent,
    IsVisibleDirective,
    MakeItBiggerDirective,
    TriplePipePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
