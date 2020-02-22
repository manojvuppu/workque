import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSupervisorListComponent } from './get-supervisor-list.component';

describe('GetSupervisorListComponent', () => {
  let component: GetSupervisorListComponent;
  let fixture: ComponentFixture<GetSupervisorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSupervisorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSupervisorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
