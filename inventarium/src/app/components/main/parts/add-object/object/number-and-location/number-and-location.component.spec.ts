import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAndLocationComponent } from './number-and-location.component';

describe('NumberAndLocationComponent', () => {
  let component: NumberAndLocationComponent;
  let fixture: ComponentFixture<NumberAndLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberAndLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberAndLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
