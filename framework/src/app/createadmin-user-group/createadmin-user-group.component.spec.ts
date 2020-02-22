import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateadminUserGroupComponent } from './createadmin-user-group.component';

describe('CreateadminUserGroupComponent', () => {
  let component: CreateadminUserGroupComponent;
  let fixture: ComponentFixture<CreateadminUserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateadminUserGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateadminUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
