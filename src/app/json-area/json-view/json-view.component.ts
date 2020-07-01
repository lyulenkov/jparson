import {Component, Input, OnInit} from '@angular/core';
import {FiltersService, StaticFilterName} from "../../../services/FiltersService";
import {ParsedJSONNode} from "../../../logic/JsonParser";

@Component({
  selector: 'json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.scss'],
})
export class JsonViewComponent implements OnInit {
  @Input('json') parsedJson: ParsedJSONNode;
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
  }

  getFilterClassList() {
    return Array.from(this.filterClassNamesSet);
  }

  ngOnInit(): void {
  }
}
