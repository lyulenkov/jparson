import {Component, Input, OnInit} from '@angular/core';
import {FiltersService} from "../../../services/FiltersService";

@Component({
  selector: 'static-filter',
  templateUrl: './static-filter.component.html',
  styleUrls: ['./static-filter.component.scss'],
})
export class StaticFilterComponent implements OnInit {
  @Input() readonly label;
  @Input() readonly name;

  constructor(private filtersService: FiltersService) {  }

  onToggled(state: boolean) {
    let name = this.name;
    this.filtersService.setStaticFilter({name, value: state})
  }

  ngOnInit(): void {
  }

}
