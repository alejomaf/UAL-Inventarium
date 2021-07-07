import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataToObjectComponent } from './add-data-to-object.component';

describe('AddDataToObjectComponent', () => {
  let component: AddDataToObjectComponent;
  let fixture: ComponentFixture<AddDataToObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDataToObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataToObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
