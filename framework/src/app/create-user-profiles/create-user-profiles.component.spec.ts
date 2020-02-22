import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserProfilesComponent } from './create-user-profiles.component';

describe('CreateUserProfilesComponent', () => {
  let component: CreateUserProfilesComponent;
  let fixture: ComponentFixture<CreateUserProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
