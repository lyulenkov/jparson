import {Component} from '@angular/core';
import {StyleThemes} from "../ts/types/types";
import {appState} from "../ts/utils/AppState";

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Jparson';
  private theme = appState.darkTheme ? StyleThemes.DARK: StyleThemes.CLASSIC;

  toggleTheme() {
    this.theme = this.theme === StyleThemes.CLASSIC ? StyleThemes.DARK : StyleThemes.CLASSIC;
    appState.darkTheme = this.isDarkTheme();
  }

  isDarkTheme() {
    return this.theme == StyleThemes.DARK;
  }

  getTheme() {
    return this.theme;
  }
}
