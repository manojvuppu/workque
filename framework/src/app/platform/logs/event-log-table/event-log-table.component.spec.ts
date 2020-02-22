import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogTableComponent } from './event-log-table.component';

describe('EventLogTableComponent', () => {
  let component: EventLogTableComponent;
  let fixture: ComponentFixture<EventLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
