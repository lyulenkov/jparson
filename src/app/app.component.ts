import {Component} from '@angular/core';
import {StyleThemes} from "../ts/types/types";

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Jparson';
  private theme = StyleThemes.CLASSIC;

  toggleDarkMode() {
    this.theme = this.theme === StyleThemes.CLASSIC ? StyleThemes.DARK : StyleThemes.CLASSIC;
  }

  isDarkMode() {
    return this.theme == StyleThemes.DARK;
  }

  getTheme() {
    return this.theme;
  }
}
