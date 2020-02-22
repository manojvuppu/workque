import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByDuedateComponent } from './tasks-by-duedate.component';

describe('TasksByDuedateComponent', () => {
  let component: TasksByDuedateComponent;
  let fixture: ComponentFixture<TasksByDuedateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksByDuedateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksByDuedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
