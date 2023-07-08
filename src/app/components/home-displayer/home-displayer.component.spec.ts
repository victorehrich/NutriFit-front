import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDisplayerComponent } from './home-displayer.component';

describe('HomeDisplayerComponent', () => {
  let component: HomeDisplayerComponent;
  let fixture: ComponentFixture<HomeDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
