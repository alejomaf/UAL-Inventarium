import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectObjectToCreateComponent } from './select-object-to-create.component';

describe('SelectObjectToCreateComponent', () => {
  let component: SelectObjectToCreateComponent;
  let fixture: ComponentFixture<SelectObjectToCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectObjectToCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectObjectToCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
