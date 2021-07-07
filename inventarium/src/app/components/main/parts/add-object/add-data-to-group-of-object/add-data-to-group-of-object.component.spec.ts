import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataToGroupOfObjectComponent } from './add-data-to-group-of-object.component';

describe('AddDataToGroupOfObjectComponent', () => {
  let component: AddDataToGroupOfObjectComponent;
  let fixture: ComponentFixture<AddDataToGroupOfObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDataToGroupOfObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataToGroupOfObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
