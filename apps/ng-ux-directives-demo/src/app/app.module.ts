import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgUxDirectivesModule } from '@qarun-qb/ng-ux-directives';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgUxDirectivesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
