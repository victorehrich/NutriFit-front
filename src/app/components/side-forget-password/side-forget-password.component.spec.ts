import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideForgetPasswordComponent } from './side-forget-password.component';

describe('SideForgetPasswordComponent', () => {
  let component: SideForgetPasswordComponent;
  let fixture: ComponentFixture<SideForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideForgetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
