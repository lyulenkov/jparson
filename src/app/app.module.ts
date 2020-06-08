import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JsonAreaComponent } from './json-area/json-area.component';
import {FormsModule} from "@angular/forms";
import { JsonViewComponent } from './json-area/json-view/json-view.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonAreaComponent,
    JsonViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
