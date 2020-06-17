import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagFilterComponent } from './flag-filter.component';

describe('FlagFilterComponent', () => {
  let component: FlagFilterComponent;
  let fixture: ComponentFixture<FlagFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
