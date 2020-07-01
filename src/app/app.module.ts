import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JsonAreaComponent } from './json-area/json-area.component';
import {FormsModule} from "@angular/forms";
import { JsonViewComponent } from './json-area/json-view/json-view.component';
import { ToolsPanelComponent } from './tools-panel/tools-panel.component';
import { SwitchComponent } from './ui/switch/switch.component';
import { StaticFilterComponent } from './tools-panel/static-filter/static-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonAreaComponent,
    JsonViewComponent,
    ToolsPanelComponent,
    SwitchComponent,
    StaticFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
