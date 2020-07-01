import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticFilterComponent } from './static-filter.component';

describe('FlagFilterComponent', () => {
  let component: StaticFilterComponent;
  let fixture: ComponentFixture<StaticFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
