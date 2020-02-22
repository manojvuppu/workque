import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogDetailsComponent } from './event-log-details.component';

describe('EventLogDetailsComponent', () => {
  let component: EventLogDetailsComponent;
  let fixture: ComponentFixture<EventLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
