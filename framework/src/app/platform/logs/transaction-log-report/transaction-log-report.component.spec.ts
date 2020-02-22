import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLogReportComponent } from './transaction-log-report.component';

describe('TransactionLogReportComponent', () => {
  let component: TransactionLogReportComponent;
  let fixture: ComponentFixture<TransactionLogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionLogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
