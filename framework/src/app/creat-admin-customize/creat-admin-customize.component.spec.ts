import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatAdminCustomizeComponent } from './creat-admin-customize.component';

describe('CreatAdminCustomizeComponent', () => {
  let component: CreatAdminCustomizeComponent;
  let fixture: ComponentFixture<CreatAdminCustomizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatAdminCustomizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatAdminCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
