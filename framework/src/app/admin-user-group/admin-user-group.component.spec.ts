import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserGroupComponent } from './admin-user-group.component';

describe('AdminUserGroupComponent', () => {
  let component: AdminUserGroupComponent;
  let fixture: ComponentFixture<AdminUserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
