import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserGroupsComponent } from './create-user-groups.component';

describe('CreateUserGroupsComponent', () => {
  let component: CreateUserGroupsComponent;
  let fixture: ComponentFixture<CreateUserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
