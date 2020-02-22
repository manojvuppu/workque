import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLogTableComponent } from './transaction-log-table.component';

describe('TransactionLogTableComponent', () => {
  let component: TransactionLogTableComponent;
  let fixture: ComponentFixture<TransactionLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
