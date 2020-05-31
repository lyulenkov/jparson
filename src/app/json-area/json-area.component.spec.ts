import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonAreaComponent } from './json-area.component';

describe('JsonAreaComponent', () => {
  let component: JsonAreaComponent;
  let fixture: ComponentFixture<JsonAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
