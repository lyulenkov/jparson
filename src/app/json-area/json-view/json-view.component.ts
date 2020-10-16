import {Component, Input, OnInit} from '@angular/core';
import {FiltersService, StaticFilter} from "../../../services/FiltersService";
import {ParsedJSONNode} from "../../../ts/logic/JsonParser";

@Component({
  selector: 'json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.scss'],
})
export class JsonViewComponent implements OnInit {
  @Input('json') parsedJson: ParsedJSONNode;
  private filterClassNamesSet: Set<string> = new Set();
  private readonly mainClassName = 'json-view';

  constructor(private filtersService: FiltersService) {
    filtersService.staticFilter$.subscribe(this.onStaticFilterChange.bind(this));
  }

  onStaticFilterChange(filter: StaticFilter) {
    if (filter.value) {
      this.filterClassNamesSet.add(filter.name);
    } else {
      this.filterClassNamesSet.delete(filter.name);
    }
  }

  getClassList() {
    return [this.mainClassName, ...Array.from(this.filterClassNamesSet)];
  }

  onLineMouseover(node: ParsedJSONNode) {
    if (node.isFoldingLine()) {
      node.setHover();
      if (node.isClosingLine()) {
        node.getCorrespondingOpeningLineNode().setHover();
      } else {
        node.getClosingLineNode().setHover();
      }
    }
  }

  onLineMouseout(node: ParsedJSONNode) {
    if (node.isFoldingLine()) {
      node.removeHover();
      if (node.isClosingLine()) {
        node.getCorrespondingOpeningLineNode().removeHover();
      } else {
        node.getClosingLineNode().removeHover();
      }
    }
  }

  ngOnInit(): void {
  }
}
