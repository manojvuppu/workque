import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytasksTableComponent } from './mytasks-table.component';

describe('MytasksTableComponent', () => {
  let component: MytasksTableComponent;
  let fixture: ComponentFixture<MytasksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytasksTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytasksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
