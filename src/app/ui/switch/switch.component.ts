import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  private state: boolean = false;
  @Output() toggled = new EventEmitter<boolean>();

  constructor() { }

  toggle() {
    this.state = !this.state;
    this.toggled.emit(this.state);
  }

  isActive() {
    return this.state;
  }

  ngOnInit(): void {
  }

}
