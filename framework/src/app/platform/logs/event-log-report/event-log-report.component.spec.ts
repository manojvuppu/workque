import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogReportComponent } from './event-log-report.component';

describe('EventLogReportComponent', () => {
  let component: EventLogReportComponent;
  let fixture: ComponentFixture<EventLogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
