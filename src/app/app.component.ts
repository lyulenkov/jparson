import { Component } from '@angular/core';
import {StyleThemes} from "../ts/types/types";

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'json-ripper';
  theme = StyleThemes.CLASSIC;
}
