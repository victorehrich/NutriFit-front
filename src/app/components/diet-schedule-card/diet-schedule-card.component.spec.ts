import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietScheduleCardComponent } from './diet-schedule-card.component';

describe('DietScheduleCardComponent', () => {
  let component: DietScheduleCardComponent;
  let fixture: ComponentFixture<DietScheduleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietScheduleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietScheduleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
