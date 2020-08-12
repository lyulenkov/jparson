import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FiltersService} from "../../../services/FiltersService";

@Component({
  selector: 'dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss']
})
export class DynamicFilterComponent implements OnInit {
  @ViewChild('inputElement') inputElement: ElementRef;
  @Input() readonly label: string;
  @Input() readonly name: string;
  @Input() readonly mask: string;
  searchValue: string;
  private maskRegexp: RegExp;
  private filterApplicationTimeout: number;
  private readonly filterApplicationDelay = 300; // ms

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    this.maskRegexp = this.mask && new RegExp(this.mask);
  }

  onKeyPress(event) {
    if (this.maskRegexp && !this.maskRegexp.test(this.searchValue + event.key)) {
      event.preventDefault();
    }
  }

  onValueChange() {
    clearTimeout(this.filterApplicationTimeout);
    this.filterApplicationTimeout = setTimeout(() => {
      this.filtersService.setDynamicFilter({name: this.name, value: this.searchValue});
    }, this.filterApplicationDelay);
  }

  clear() {
    this.inputElement.nativeElement.focus();
    this.searchValue = '';
    this.onValueChange();
  }
}
