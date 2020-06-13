import {Component, Input, OnInit} from '@angular/core';
import {JsonParser, ParsedJsonLine} from "../../logic/JsonParser";


type JsonAreaMode = {
  mainClass: string,
  editBtnIconClass: string
};

const AreaModes: {[key: string]: JsonAreaMode} = {
  EDIT: {
    mainClass: 'edit-mode',
    editBtnIconClass: 'fa-check',
  },
  VIEW : {
    mainClass: 'view-mode',
    editBtnIconClass: 'fa-pencil'
  }
} as const;

@Component({
  selector: 'app-json-area',
  templateUrl: './json-area.component.html',
  styleUrls: ['./json-area.component.scss']
})
export class JsonAreaComponent implements OnInit {
  private mode = AreaModes.EDIT;
  @Input() json = '';
  parsedJson: ParsedJsonLine[] = null;

  constructor() {
    // TODO: remove testing data
    this.json = '{\n' +
        '  "Actors": [\n' +
        '    {\n' +
        '      "name": "Tom Cruise",\n' +
        '      "age": 56,\n' +
        '      "Born At": "Syracuse, NY",\n' +
        '      "Birthdate": "July 3, 1962",\n' +
        '      "photo": "https://jsonformatter.org/img/tom-cruise.jpg",\n' +
        '      "wife": null,\n' +
        '      "weight": 67.5,\n' +
        '      "hasChildren": true,\n' +
        '      "hasGreyHair": false,\n' +
        '      "children": [\n' +
        '        "Suri",\n' +
        '        "Isabella Jane",\n' +
        '        "Connor"\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "name": "Robert Downey Jr.",\n' +
        '      "age": 53,\n' +
        '      "Born At": "New York City, NY",\n' +
        '      "Birthdate": "April 4, 1965",\n' +
        '      "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg",\n' +
        '      "wife": "Susan Downey",\n' +
        '      "weight": 77.1,\n' +
        '      "hasChildren": true,\n' +
        '      "hasGreyHair": false,\n' +
        '      "children": [\n' +
        '        "Indio Falconer",\n' +
        '        "Avri Roel",\n' +
        '        "Exton Elias"\n' +
        '      ]\n' +
        '    }\n' +
        '  ]\n' +
        '}';
  }

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
      console.log(this.parsedJson);
    } catch (e) {
      console.error(e);
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
