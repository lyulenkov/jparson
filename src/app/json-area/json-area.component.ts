import {Component, Input, OnInit} from '@angular/core';
import {JsonParser, ParsedJSONNode} from "../../ts/logic/JsonParser";
import {DynamicFilter, FiltersService} from "../../services/FiltersService";

enum AreaModes {
  EDIT = 'edit-mode',
  VIEW = 'view-mode'
}

@Component({
  selector: 'json-area',
  templateUrl: './json-area.component.html',
  styleUrls: ['./json-area.component.scss']
})
export class JsonAreaComponent implements OnInit {
  private mode = AreaModes.EDIT;
  @Input() json = '';
  private nameToFilter = new Map<string, DynamicFilter>();
  parsedJson = new ParsedJSONNode({value: null, number: 0}); // TODO: replace with undefined and add ngIf to display component

  constructor(private filtersService: FiltersService) {
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

    filtersService.dynamicFilters$.subscribe(this.applyDynamicFilter.bind(this));
  }

  applyDynamicFilter(filter: DynamicFilter) {
    filter.value ? this.nameToFilter.set(filter.name, filter) : this.nameToFilter.delete(filter.name);
    this.parseJson();
  }

  changeMode() {
    switch (this.mode) {
      case AreaModes.EDIT:
        // TODO: check if source json has been changed
        this.parseJson();
        this.mode = AreaModes.VIEW;
        break;
      case AreaModes.VIEW:
        this.mode = AreaModes.EDIT;
    }
  }

  parseJson(): boolean {
    try {
      JsonParser.setFilters(Array.from(this.nameToFilter.values()));
      this.parsedJson = JsonParser.parse(this.json);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  getMode() {
    return this.mode;
  }

  isViewMode() {
    return this.mode == AreaModes.VIEW;
  }

  isEditingMode() {
    return this.mode == AreaModes.EDIT;
  }

  ngOnInit(): void {
  }
}
