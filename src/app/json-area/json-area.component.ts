import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {JsonParser, ParsedJson} from "../../logic/JsonParser";


enum AreaModes {
  EDIT = 'edit-mode',
  VIEW = 'view-mode'
}

@Component({
  selector: 'app-json-area',
  templateUrl: './json-area.component.html',
  styleUrls: ['./json-area.component.scss']
})
export class JsonAreaComponent implements OnInit {
  private mode = AreaModes.EDIT;
  @Input() json = '';
  parsedJson: ParsedJson = null;

  constructor() {  }

  changeMode() {
    switch (this.mode) {
      case AreaModes.EDIT:
        this.parseJson();
        this.mode = AreaModes.VIEW;
        break;
      case AreaModes.VIEW:
        this.mode = AreaModes.EDIT;
    }
  }

  parseJson(): boolean {
    try {
      this.parsedJson = JsonParser.parse(this.json);
    } catch (e) {
      return false;
    }
    return true;
  }

  getMode() {
    return this.mode;
  }

  ngOnInit(): void {
  }
}
