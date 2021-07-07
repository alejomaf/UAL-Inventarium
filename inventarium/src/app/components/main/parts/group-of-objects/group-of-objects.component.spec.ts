import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOfObjectsComponent } from './group-of-objects.component';

describe('GroupOfObjectsComponent', () => {
  let component: GroupOfObjectsComponent;
  let fixture: ComponentFixture<GroupOfObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupOfObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOfObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
