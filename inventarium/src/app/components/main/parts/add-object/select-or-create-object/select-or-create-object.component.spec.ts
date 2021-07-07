import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrCreateObjectComponent } from './select-or-create-object.component';

describe('SelectOrCreateObjectComponent', () => {
  let component: SelectOrCreateObjectComponent;
  let fixture: ComponentFixture<SelectOrCreateObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOrCreateObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrCreateObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
