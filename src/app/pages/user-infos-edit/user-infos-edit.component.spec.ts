import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfosEditComponent } from './user-infos-edit.component';

describe('UserInfosEditComponent', () => {
  let component: UserInfosEditComponent;
  let fixture: ComponentFixture<UserInfosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
