import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FiltersService} from "../../../services/FiltersService";

@Component({
  selector: 'dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss']
})
export class DynamicFilterComponent implements OnInit {
  @Input() readonly label: string;
  @Input() readonly name: string;
  @Input() searchValue: string;
  private filterApplicationTimeout: number;
  private readonly filterApplicationDelay = 300; // ms

  constructor(private filtersService: FiltersService) { }

  ngOnInit(): void {
  }

  onValueChange() {
    clearTimeout(this.filterApplicationTimeout);
    this.filterApplicationTimeout = setTimeout(() => {
      this.filtersService.setDynamicFilter({name: this.name, value: this.searchValue});
    }, this.filterApplicationDelay);
  }

}
