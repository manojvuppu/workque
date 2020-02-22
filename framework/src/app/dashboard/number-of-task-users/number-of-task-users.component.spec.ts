import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfTaskUsersComponent } from './number-of-task-users.component';

describe('NumberOfTaskUsersComponent', () => {
  let component: NumberOfTaskUsersComponent;
  let fixture: ComponentFixture<NumberOfTaskUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfTaskUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfTaskUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
