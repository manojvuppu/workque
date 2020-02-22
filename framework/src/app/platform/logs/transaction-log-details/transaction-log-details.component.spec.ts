import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLogDetailsComponent } from './transaction-log-details.component';

describe('TransactionLogDetailsComponent', () => {
  let component: TransactionLogDetailsComponent;
  let fixture: ComponentFixture<TransactionLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
