import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedVsResolvedQueueComponent } from './created-vs-resolved-queue.component';

describe('CreatedVsResolvedQueueComponent', () => {
  let component: CreatedVsResolvedQueueComponent;
  let fixture: ComponentFixture<CreatedVsResolvedQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedVsResolvedQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedVsResolvedQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
