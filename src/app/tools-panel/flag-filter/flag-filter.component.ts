import {Component, Input, OnInit} from '@angular/core';
import {FiltersService} from "../../../services/FiltersService";

@Component({
  selector: 'app-flag-filter',
  templateUrl: './flag-filter.component.html',
  styleUrls: ['./flag-filter.component.scss'],
})
export class FlagFilterComponent implements OnInit {
  @Input() readonly title;
  @Input() readonly name;

  constructor(private filtersService: FiltersService) {  }

  onToggled(state: boolean) {
    let name = this.name;
    this.filtersService.setStaticFilter({name, value: state})
  }

  ngOnInit(): void {
  }

}
