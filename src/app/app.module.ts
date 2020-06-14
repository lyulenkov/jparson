import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JsonAreaComponent } from './json-area/json-area.component';
import {FormsModule} from "@angular/forms";
import { JsonViewComponent } from './json-area/json-view/json-view.component';
import { ToolsPanelComponent } from './tools-panel/tools-panel.component';
import { SwitchComponent } from './ui/switch/switch.component';
import { FlagFilterComponent } from './tools-panel/flag-filter/flag-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonAreaComponent,
    JsonViewComponent,
    ToolsPanelComponent,
    SwitchComponent,
    FlagFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
