import {Component, Input, OnInit} from '@angular/core';
import {ParsedJsonLine} from "../../../logic/JsonParser";
import {FiltersService, StaticFilterName} from "../../../services/FiltersService";

@Component({
  selector: 'app-json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.scss'],
})
export class JsonViewComponent implements OnInit {
  @Input('json') parsedJson: ParsedJsonLine[];
  private filterClassNamesSet: Set<string> = new Set();

  constructor(private filtersService: FiltersService) {
    filtersService.staticFilter$.subscribe(filter => {
      if (filter.value) {
        this.filterClassNamesSet.add(filter.name);
      } else {
        this.filterClassNamesSet.delete(filter.name);
      }
    });
  }

  applySearchFilter(pattern: string) {
    this.parsedJson.forEach(line => {
      if (!line.value) return;
      if (!line.rejectedByFilters) {
        line.rejectedByFilters = new Set();
      }
      
    })
  }

  getFilterClassList() {
    return Array.from(this.filterClassNamesSet);
  }

  ngOnInit(): void {
  }

}

type JsonViewFilter = {
  class?: string,
  value : string | boolean,
};
